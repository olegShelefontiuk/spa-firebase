import React, { useState} from 'react'

import firebase from "firebase";

// import {Context} from "./Firebase";
import  {navigate} from '@reach/router'



export const CheckIn = (prop) => {

    console.log(prop.meetingID)


    const [state, setState] = useState({
        email:'',
        displayName:''
    })

    function handleChange(e) {
        const itemName = e.target.name
        const itemValue = e.target.value;

        setState({
            ...state, [itemName]: itemValue
        })
    }


    function handleSubmit(e){

        e.preventDefault()

        const ref = firebase
            .database()
            .ref(`/meetings/${prop.userID}/${prop.meetingID}/attendees`);
        ref.push({
            attendeeName: state.displayName,
            attendeeEmail: state.email,
            star: false
        })


        navigate(`/checkin/${prop.userID}/${prop.meetingID}/attendees`)

        setState( {
            email:'',
            displayName:''
    })
    }



    
    return(
        <form className="mt-3" onSubmit={handleSubmit}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h3 className="font-weight-light mb-3">Check in</h3>
                                <section className="form-group">
                                    <label
                                        className="form-control-label sr-only"
                                        htmlFor="displayName"
                                    >
                                        Name
                                    </label>
                                    <input
                                        required
                                        className="form-control"
                                        type="text"
                                        id="displayName"
                                        name="displayName"
                                        placeholder="Name"
                                        value={state.displayName}
                                        onChange={handleChange}
                                    />
                                </section>
                                <section className="form-group">
                                    <label
                                        className="form-control-label sr-only"
                                        htmlFor="Email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        required
                                        className="form-control"
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        value={state.email}
                                        onChange={handleChange}
                                    />
                                </section>
                                <div className="form-group text-right mb-0">
                                    <button className="btn btn-primary" type="submit">
                                        Check in
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}