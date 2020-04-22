import React from 'react'
import firebase from '../config/fbConfig'


export default function Dashboard({ user }) {
    const name = user && user.email
    const logout = () => {
        firebase.auth().signOut()
    }

    return (
        <div onClick={logout}>
            Welcome to the Dashboard {name}
        </div>
    )
}
