import React from 'react'
import {FaUsers} from 'react-icons/fa'
import {Link} from '@reach/router'

export const Navigation = (prop) =>{
    const user = prop.user

    return(
        <nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand"><FaUsers className="mr-1"/>
                    Meeting Log
                </Link>
                <div className="navbar-nav ml-auto">
                    {user && <Link className="nav-item nav-link" to="/meetings">
                        meetings
                    </Link>}

                    {user == null && <Link className="nav-item nav-link" to="/login" >
                        log in
                    </Link>}

                    {!user &&  <Link className="nav-item nav-link" to="/register">
                        register
                        </Link>}
                    {user && <Link className="nav-item nav-link" to="/login" onClick={e=>prop.firebaseLogout(e)}>
                        log out
                    </Link> }

                </div>
            </div>
        </nav>
    )
}