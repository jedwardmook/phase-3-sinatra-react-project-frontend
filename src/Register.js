import React from "react";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function Register(){
    const [registerEmployee, setRegisterEmployee] = useState({
        first_name: "",
        last_name: "",
        email_address: ""
    })

    const handleChange = (e) => {
        setRegisterEmployee({
            ...registerEmployee,
            [e.target.name] : e.target.value
        })
    }

    let navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:9292/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: registerEmployee.first_name,
                last_name: registerEmployee.last_name,
                email_address: registerEmployee.email_address
            }),
        })
        .then((r) => r.json())
        .then(response => {
            console.log(response)
            navigate("/logs")
        })
    };



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
            <h5>Back to <Link to={'/'}>login</Link></h5>
        </div>
    )
}


export default Register