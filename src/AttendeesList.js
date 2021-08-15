import React from 'react'
import {GoTrashcan, GoStar, GoMail} from "react-icons/all";
import firebase from "./Firebase";

export const AttendeesList = (props) => {

    function deleteAttendee  (e,whichMeeting, whichAttendee)  {
        e.preventDefault();
        const adminUser = props.adminUser
        const ref = firebase
            .database().ref(`meetings/${adminUser}/${whichMeeting}/attendees/${whichAttendee}`)
        ref.remove()
    }

    function toggleStar  (e,star, whichMeeting, whichAttendee)  {
        e.preventDefault();
        const adminUser = props.adminUser
        const ref = firebase
            .database().ref(`meetings/${adminUser}/${whichMeeting}/attendees/${whichAttendee}/star`)
        if(star === undefined) {
            ref.set(true)
        }    else {
            ref.set(!star)
        }
    }
    const admin = props.adminUser === props.userID ? true : false
    console.log(props)


    const attendees = props.attendees

    const myAttendees = attendees.map(item =>{
        return(
        <div className="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1" key={item.attendeeID}>
            <div className="card">
                <div className="card-body px-3 py-2 d-flex align-items-center justify-content-center">
                    <div className={'card-body px-3 py-2 d-flex align-items-center ' + (admin ? '': 'justify-content-center')}>
                    <div>
                        {admin ? (<div className="btn-group pr-2">
                            <button className={'btn '+(item.star ? 'btn-info' :'btn-outline-secondary')} style={{marginRight:5}}
                                    title="Add Star"
                                    onClick={e=>toggleStar(e, item.star, props.meetingID, item.attendeeID)}><GoStar />

                            </button>
                            <a href={`mailto:${item.attendeeEmail}`}
                               className="btn btn-sm btn-outline-secondary " style={{marginRight:5}}
                                    title="Send Email"
                                    onClick={()=>console.log('Send Email')}><GoMail />

                            </a>
                        <button className="btn btn-sm btn-outline-secondary " style={{marginRight:5}}
                        title="Delete Attendee"
                        onClick={e=>deleteAttendee(e, props.meetingID, item.attendeeID)}><GoTrashcan />

                        </button>
                            {item.attendeeName}</div>) : (item.attendeeName)}

                    </div>
                    </div>
                </div>
            </div>
        </div>
        )})
    return(
        <div className="row justify-content-center">
            {myAttendees}
        </div>
    )
}