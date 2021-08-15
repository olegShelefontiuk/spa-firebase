import React, {useState} from 'react'
// import firebase from "./Firebase";
import {MeetingList} from "./MeetingList";

export const Meetings = (props) => {
    const userID = props.userID

    const [state,setState] = useState({
        meetingName:''
    })

    function handleChange(e) {
        const itemName = e.target.name
        const itemValue = e.target.value;

        setState({
             [itemName]: itemValue
        })
    }

    function handleSubmit(e) {

        e.preventDefault()
        props.addMeeting(state.meetingName)
        setState({meetingName:''})

    }
    return(
        <div className="container mt-4" >
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <h1 className="font-weight-light">Add a Meeting</h1>
                    <div className="card bg-light">
                        <div className="card-body text-center">
                            <form className="form-group" onSubmit={handleSubmit}
                            >
                                <div className="input-group input-group-lg">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="meetingName"
                                        placeholder="Meeting name"
                                        aria-describedby="buttonAdd"
                                        value={state.meetingName}
                                        onChange={handleChange}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            type="submit"
                                            className="btn btn-sm btn-info"
                                            id="buttonAdd"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-11 col-md-6 text-center">
                    <div className="card border-top-0 rounded-0">
                        {props.meetings ? (
                            <div className="card-body py-2">
                                <h4 className="card-title font-weight-light m-0 ">Your Meetings</h4>
                            </div>
                        ) : null}

                        {props.meetings && (
                            <div className="list-group-flush">
                                <MeetingList meetings={props.meetings} userID={userID}/>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}