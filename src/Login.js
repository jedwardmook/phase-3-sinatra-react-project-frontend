import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
            <h5>Click to <Link to={"/register"}>register</Link></h5>
        </div>
    )
}


export default Login;