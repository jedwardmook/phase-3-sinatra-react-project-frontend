import React from "react";
import { useState } from 'react';

function Register(){
    const [registerEmployee, setRegisterEmployee] = useState({
        first_name: "",
        last_name: "",
        email_address: ""}
        )

    const handleChange = (e) => {
        setRegisterEmployee({
            ...registerEmployee,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(registerEmployee)
    }

    return (
        <div>
            <form id="register-form" onSubmit={handleSubmit}>
            <input
                id="register-first-name"
                type="text" 
                name="first_name"
                value={registerEmployee.first_name}
                placeholder="First Name"
                onChange={handleChange}
            /><br />
            <input
                id="register-last-name"
                type="text" 
                name="last_name"
                value={registerEmployee.last_name}
                placeholder="Last Name"
                onChange={handleChange}
            /><br />
            <input 
                id="register-email"
                type="text" 
                name="email_address"
                value={registerEmployee.email_address}
                placeholder="Email Address"
                onChange={handleChange}
            /><br />
            <button>Register</button>
            </form>
        </div>
    )
}


export default Register