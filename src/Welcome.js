import React from 'react'


export const Welcome = (prop) => {
    const user = prop.user
    return(
        <div className="text-center rm-4">
            <span className="text-secondary font-weight-bold pl-1">
                Welcome {user}
            </span>,
            <span style={{
                cursor: 'pointer'
            }} className="text-secondary font-weight-bold pl-1" onClick={e=>prop.firebaseLogout(e) }

            > logOut
            </span>

        </div>
    )
}