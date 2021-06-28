import React, { Component } from 'react';
import Moment from 'react-moment';
import {FaTimes} from 'react-icons/fa';

class ListAppointments extends Component {

    render() {
        return (
            <div className="appointment-list item-list mb-3">
                {/* We need to loop over the array and display each name one by one */}
                {this.props.appointmentNames.map(item => (      // works like a render function
                    <div className="pet-item col media py-3" key = {item.aptId}>
                        <div className="mr-3">
                            <button className="pet-delete btn btn-sm btn-danger" 
                                    onClick = {() => this.props.deleteAppointment(item)}>  
                                    {/*returns a new array without that item. That is why an arrow function*/} 
                                <FaTimes /> {/*fancy icon*/}
                            </button>
                        </div>

                        <div className="pet-info media-body">
                            <div className="pet-head d-flex">
                                <span 
                                className="pet-name"
                                contentEditable // allows html to update info
                                suppressContentEditableWarning // suppress all the warnings that react creates because it is not used to change stuff from DOM
                                onBlur = {e => this.props.updateInfo('petName', e.target.innerText, item.aptId )} // changes the current value
                                >{item.petName}</span>
                                <span className="apt-date ml-auto">
                                    <Moment  // for the date and time appearance  
                                        // below are the required props
                                        date = {item.aptDate}   // date to display
                                        parse = 'YYYY-MM-DD hh:mm'  // format the date and time is coming in
                                        format = 'MMM-D h:mma'      // format to display the date and time
                                    />
                                </span>
                            </div>

                            <div className="owner-name">
                                <span className="label-item">Owner: </span>
                                <span
                                contentEditable // allows html to update info
                                suppressContentEditableWarning // suppress all the warnings that react creates because it is not used to change stuff from DOM
                                onBlur = {e => this.props.updateInfo('ownerInfo', e.target.innerText, item.aptId )} // changes the current value
                                >{item.ownerName}</span>
                            </div>
                            <div className="apt-notes"
                            contentEditable // allows html to update info
                            suppressContentEditableWarning // suppress all the warnings that react creates because it is not used to change stuff from DOM
                            onBlur = {e => this.props.updateInfo('aptNotes', e.target.innerText, item.aptId )} // changes the current value
                            >{item.aptNotes}</div>
                        </div>
                    </div>
                ))}

            </div>
        );
    }

}

export default ListAppointments;