import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({employees}){

    const [first_name, last_name, email_address, id] = employees
    
    const [user, setUser] = useState({
        first_name: "",
        email_address: ""
    })
    

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: [e.target.value]
        })
    }

    const handleLogin = () => {
        if (user.first_name === first_name && user.email_address === email_address)
        console.log(id)
    }

    return (
        <div>
            <p>First name:</p>
            <input
                id="first-name-input"
                type="text" 
                name="first_name"
                value={user.first_name}
                placeholder="First Name"
                onChange={handleChange}    
            /><br/>
            <p>Email Address:</p>
            <input
                id="email-input"
                type="text" 
                name="email_address"
                value={user.email_address}
                placeholder="Email Address"
                onChange={handleChange}    
            /><br/>
            <button onClick={handleLogin}>Login</button><br></br>
            <h5>Click to <Link to={"/register"}>register</Link></h5>
        </div>
    )
}


export default Login;