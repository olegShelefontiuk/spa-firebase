import React, {useContext, useState} from 'react'
import firebase from "firebase";
import {Context} from "./Firebase";
import GoogleButton from 'react-google-button'
import  {navigate} from '@reach/router'



export const Login = () => {

    const [state, setState] = useState({
        email:'',
        password:''
    })

  function handleChange(e) {
      const itemName = e.target.name
      const itemValue = e.target.value;

      setState({
          ...state, [itemName]: itemValue
      })
    }

    function handleSubmit(e){
        let loginInfo = {
            email: state.email,
            password: state.password
        }
        e.preventDefault()

        firebase
            .auth()
            .signInWithEmailAndPassword(
                loginInfo.email,
                loginInfo.password
            )
            .then(() => {
                navigate('/meetings')
            })


    }
const {auth} = useContext(Context)

    const login = async () =>{
    const provider = new firebase.auth.GoogleAuthProvider()
    const {user} = await auth.signInWithPopup(provider)
        console.log(user)
    }
    return(
        <form className="mt-3" onSubmit={handleSubmit}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h3 className="font-weight-light mb-3">Log in</h3>
                                <section className="form-group">
                                    <label
                                        className="form-control-label sr-only"
                                        htmlFor="Email">
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
                                <section className="form-group">
                                    <input
                                        required
                                        className="form-control"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={state.password}
                                        onChange={handleChange}
                                    />
                                </section>
                                <div className="form-group text-right mb-0">
                                    <button className="btn btn-primary" type="submit">
                                        Log in
                                    </button>
                                    <GoogleButton onClick={() => login()} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}