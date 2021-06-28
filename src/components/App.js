// npm i -s bootstrap react-icons lodash jquery popper.js moment react-moment
// i is for install and -s is to save them as project's dependencies 

import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';

import { without, findIndex } from 'lodash'; // returns a new array after removing an item from the array

class App extends Component {

  constructor() {
    super(); // it is required so that we can use 'this' keyword and access things from the component class.

    // this.state intializes an object
    // The state property can be really powerful as if any component is using a state and for some reason that state changes, 
    // react automatically redraws the component that is using that state.

    this.state = {
      //myName: 'Shrey' 
      appointments: [],
      orderBy: 'petName',
      orderDir: 'asc',
      formDisplay: false, // to display the form
      queryText: '', // for the search
      lastIndex: 0 // key for each index in the appointment array
    }

    // bind 'this' to delete appointment otherwise 'this' will not work in the method 
    this.deleteAppointment = this.deleteAppointment.bind(this); 
    this.toggleForm = this.toggleForm.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchApts = this.searchApts.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  // a lifecycle method
  // it will be used for fetching data from the json file in public folder immediately after the component is mounted 
  componentDidMount() {
    fetch('./data.json') // we use './' even if the files are not in same directory because once the prpoject compiles all the files are in same directory
      .then(response => response.json()) // converts the response in json object
      .then(result => {
        const apt = result.map(item => {
          item.aptId = this.state.lastIndex;  // this is used to give each index in the array a unique key
          this.setState({ lastIndex: this.state.lastIndex + 1 });
          return item;
        })
        this.setState({ appointments: apt }); // the result variable holds all the data and we will set the state to it
      });
  }

  // for searching the appointments
  searchApts(query){
    this.setState({queryText: query});
  }

  // a function to make the sortBy button work
  changeOrder(order, dir){
    this.setState({
      orderBy: order,
      orderDir: dir
    });
  }

  // adds a new appointment to the appointments array after the submitting 
  addAppointment(apt){
    const temp = this.state.appointments;
    apt.aptId = this.state.lastIndex;
    temp.unshift(apt);

    this.setState({
      appointments: temp,
      lastIndex: this.state.lastIndex + 1
    });

  }

  // display the form after clicking on the heading
  toggleForm(){
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  }

  updateInfo(fieldName, value, id){
    let temp = this.state.appointments;
    let aptIndex = findIndex(this.state.appointments, {aptId: id});
    temp[aptIndex][fieldName] = value;

    this.setState({
      appointments: temp
    });
  }

  // deletes the appointment
  deleteAppointment(apt){
    let temp = this.state.appointments;
    temp = without(temp, apt);
    this.setState({appointments: temp})
  }

  render() {

    // creates a variable to hold state
    let order;
    let filteredApts = this.state.appointments;

    // initialize order
    if(this.state.orderDir === 'asc'){
      order = 1;
    }else{
      order = -1;
    }

    // sort the appointments
    filteredApts = filteredApts.sort((a,b) => { // since it is a higher order function, it can't modify array directy. That's why we add 'filteredApts =' in the front
      if(a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase()){
        return -1 * order; // multiplies by order help to arrange it according to the direction (asc, desc)
      }else{
        return 1 * order;
      }
    }).filter(eachItem => {     // filters each item according to the search query  
      return (
        eachItem['petName'].toLowerCase().includes(this.state.queryText.toLowerCase()) || 
        eachItem['ownerName'].toLowerCase().includes(this.state.queryText.toLowerCase()) || 
        eachItem['aptNotes'].toLowerCase().includes(this.state.queryText.toLowerCase()) 
      );
    });

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">

                {/* {this.state.myName} is to access that state and display on the browser*/}

                <AddAppointments 
                formDisplay={this.state.formDisplay} 
                toggleForm = {this.toggleForm} 
                addAppointment = {this.addAppointment} 
                />
                
                <SearchAppointments 
                orderBy = {this.state.orderBy} 
                orderDir = {this.state.orderDir} 
                changeOrder = {this.changeOrder}
                searchApts = {this.searchApts}
                />

                <ListAppointments 
                appointmentNames={filteredApts} 
                deleteAppointment={this.deleteAppointment} 
                updateInfo = {this.updateInfo}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

}

export default App;
