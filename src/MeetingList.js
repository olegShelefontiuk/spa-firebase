import React from 'react'
import {FaLink, GoListUnordered, GoTrashcan} from "react-icons/all";
import firebase from "./Firebase"
import {navigate} from "@reach/router";


export const MeetingList = (prop) => {
const { meetings } = prop.meetings



   function deleteMeeting  (e, whichMeeting)  {
    e.preventDefault();
    const ref = firebase
        .database().ref(`meetings/${prop.userID}/${whichMeeting}`)
        ref.remove()
    }

   const myMeetings = meetings.map(item =>{
        return(
            <div className="list-group-item d-flex" key={item.meetingID}>
                <section className="pl-3 text-left align-self-center" >

                    <button className="btn-group btn-outline-secondary"style={{
                        marginRight:5
                    }} title="Delete Meeting"
                            onClick={e => deleteMeeting(e, item.meetingID)}
                        >
                       <GoTrashcan />
                    </button>
                    <button className="btn-group btn-outline-secondary"style={{
                        marginRight:5
                    }} title="Check In"
                            onClick={() => navigate(`/checkin/${prop.userID}/${item.meetingID}`)}
                    >
                        <FaLink />
                    </button>

                    <button className="btn-group btn-outline-secondary"style={{
                        marginRight:5
                    }} title="Attendees List"
                            onClick={() => navigate(`/checkin/${prop.userID}/${item.meetingID}/attendees`)}
                    >
                        <GoListUnordered />
                    </button>
                    {item.meetingName}
                </section>
            </div>
        )

    })

    return(
        <div className="text-center rm-4">{myMeetings}


        </div>
    )
}