import React from 'react';
import { useState } from 'react';

function Login(){
    const [firstName, setFirstName] = useState()
    const [emailAddress, setEmailAddress] = useState()

    const firstNameCheck = (e) => {
        setFirstName(e.target.value)
    }

    const emailCheck = (e) => {
        setEmailAddress(e.target.value)
    }


    return (
        <div>
            <p>First name:</p>
            <input
                id="first-name-input"
                type="text" 
                name="firstName"
                value={firstName}
                placeholder="First Name"
                onChange={firstNameCheck}    
            /><br/>
            <p>Email Address:</p>
            <input
                id="email-input"
                type="text" 
                name="emailAddress"
                value={emailAddress}
                placeholder="Email Address"
                onChange={emailCheck}    
            /><br/>
            <button>Login</button><br></br>
            <h6>Click here to register</h6>
        </div>
    )
}


export default Login;