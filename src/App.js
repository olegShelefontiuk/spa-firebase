
import './CSS/App.css';
import React, {useEffect, useState} from 'react'
import {Home} from './Home'
import {Welcome} from "./Welcome";
import {Navigation} from "./Navigation";
import {navigate, Router} from "@reach/router"
import {Login} from "./Login";
import {Register} from "./Register";
import {Meetings} from "./Meetings";
import {Context} from "./Firebase"
import {SomeComponent} from "./Components/SomeComponent";

import firebase from './Firebase'
import {CheckIn} from "./CheckIn";
import {Attendees} from "./Attendees";







export const auth = firebase.auth()
// export const firestore = firebase.firestore()
function App() {
    const [list , setList] = useState({
        meetings:
            {meetingID: 'null'}  })
    const [state, setState] = useState({
        user: 'Oleg',
        displayName: null,
        userID: null,
        meetingID: null

    })
    const firebaseLogOut = e =>{
        e.preventDefault()
setState({user:null})
        firebase.auth().signOut().then(()=>{
            navigate('/login')
        })
    }

useEffect(()=>{
    firebase.auth().onAuthStateChanged(FBUser =>{
        if(FBUser){
            setState({
                user: FBUser.email,
                userID: FBUser.uid
            })
            const meetingsRef = firebase
                .database()
                .ref(`meetings/` + FBUser.uid)

            meetingsRef.on('value',snapshot => {
                let meetings = snapshot.val();
                let meetingsList = [];

                for(let item in meetings){
                    meetingsList.push({
                        meetingID: item,
                        meetingName: meetings[item].meetingName
                    })
                }
                setList({
                    meetings:meetingsList,
                    howManyMeetings: meetingsList.length
                })

            })
        }else{
            setState({user: null})
        }
    })

// const ref = firebase.database().ref('user')
//     ref.on('value', snapshot => {
//         let FBUser = snapshot.val()
//         setState({user: FBUser})
//     })

},[])


    function logOut(){
        setState({user:null})
    }
    const addMeeting = meetingNames => {
        const ref = firebase
            .database()
            .ref(`meetings/${state.userID}`)
        ref.push({meetingName: meetingNames})

    }

  return (
      <Context.Provider value={{
         firebase, auth
      }}>
      <div>
          <Navigation
               user={state.user}  firebaseLogout={firebaseLogOut}/>
          {state.user &&
          <Welcome logout={logOut} firebaseLogout={firebaseLogOut}
              user={state.user}/>}

          <Router>
          <Home path="/" user={state.user}/>
              <Login path="/login"  />
              <Register path="/register"  />
              <Meetings path="/meetings" userID={state.userID} addMeeting={addMeeting} meetings={list || []}/>
              <SomeComponent path="component" />
              <CheckIn path="/checkin/:userID/:meetingID"  />
              <Attendees path="/checkin/:userID/:meetingID/attendees" adminUser={state.userID} />
          </Router>
      </div>
      </Context.Provider>
  );
}

export default App;
