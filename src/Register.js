import React, { useState} from 'react'
import firebase from "firebase";
export const Register = () => {

    const [state, setState] = useState({
        displayName:'',
        email:'',
        passOne:'',
        passTwo:'',
        errorMessage: ''
    })

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setState({...state, [name]: value})
    }

    function handleSubmit(e){
       let registrationInfo ={
           displayName: state.displayName,
           email: state.email,
           password: state.passOne
       }
        e.preventDefault()
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(
            registrationInfo.email,
            registrationInfo.password)

    }
    return(
        <div className="text-center rm-4">
            <form className="mt-3" onSubmit={handleSubmit}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card bg-light">
                                <div className="card-body">
                                    {state.errorMessage !== null ? (<div>{state.errorMessage}</div>): null}
                                    <h3 className="font-weight-light mb-3">Register</h3>
                                    <div className="form-row">
                                        <section className="col-sm-12 form-group">
                                            <label
                                                className="form-control-label sr-only"
                                                htmlFor="displayName"
                                            >
                                                Display Name
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="displayName"
                                                placeholder="Display Name"
                                                name="displayName"
                                                required
                                                value={state.displayName}
                                                onChange={handleChange}
                                            />
                                        </section>
                                    </div>
                                    <section className="form-group">
                                        <label
                                            className="form-control-label sr-only"
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            className="form-control"
                                            type="email"
                                            id="email"
                                            placeholder="Email Address"
                                            required
                                            name="email"
                                            value={state.email}
                                            onChange={handleChange}
                                        />
                                    </section>
                                    <div className="form-row">
                                        <section className="col-sm-6 form-group">
                                            <input
                                                className="form-control"
                                                type="password"
                                                name="passOne"
                                                placeholder="Password"
                                                value={state.passOne}
                                                onChange={handleChange}
                                            />
                                        </section>
                                        {/*<section className="col-sm-6 form-group">*/}
                                        {/*    <input*/}
                                        {/*        className="form-control"*/}
                                        {/*        type="password"*/}
                                        {/*        required*/}
                                        {/*        name="passTwo"*/}
                                        {/*        placeholder="Repeat Password"*/}
                                        {/*        value={state.passTwo}*/}
                                        {/*        onChange={handleChange}*/}
                                        {/*    />*/}
                                        {/*</section>*/}
                                    </div>
                                    <div className="form-group text-right mb-0">
                                        <button className="btn btn-primary" type="submit">
                                            Register
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}