import React, {useEffect, useState} from 'react'
import firebase from './Firebase'
import {AttendeesList} from "./AttendeesList";

export const Attendees = (prop) =>{
    const [state, setState] = useState({
        displayAttendees: [],
        searchQuery: ''

    })



    useEffect(() =>{
      const ref = firebase.database().ref(`meetings/${prop.userID}/${prop.meetingID}/attendees`)
        ref.on('value', snapshot =>{
            let attendees = snapshot.val()
            let attendeesList = []
            for(let item in attendees) {
                attendeesList.push({
                    attendeeID: item,
                    attendeeName: attendees[item].attendeeName,
                    attendeeEmail: attendees[item].attendeeEmail,
                    star: attendees[item].star
                })

            }
            setState({
                displayAttendees: attendeesList,
            })

        })
    },[])

    function handleChange (e){
const itemName = e.target.name
        const itemValue = e.target.value
        setState({[itemName] : itemValue})
    }
    // function handleSubmit(e) {
    //     e.preventDefault()
    //     prop.addMeeting(state.meetingName)
    //     setState({searchQuery:''})
    //
    // }
    return(
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="font-weight-light text-center">
                        Attendees
                    </h1>

                    <div className="card bg-light mb-4">
                        <div className="card-body text-center">
                            <input type="text"
                                   name="searchQuery"
                                // eslint-disable-next-line
                                //    value={state.searchQuery}
                                   placeholder="Search Attendees"
                                   className="form-control"
                                   onSubmit={handleChange}
                            />
                        </div>
                    </div>

                </div>
            </div>
            <AttendeesList
                attendees={state.displayAttendees}
                userID={prop.userID}
                adminUser={prop.adminUser}
                meetingID={prop.meetingID}
            />
        </div>

    )
}