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
            navigate("/home")
        })
    };



    return (
        <div className="register">
            <hr className="top_line"/>
            <h1 className="create_header">Register Employee</h1>
            <br />
            <form id="register-form" onSubmit={handleSubmit}>
                <label for="first_name" className="register_label">First Name:</label>
                <input
                    id="register-first-name"
                    type="text" 
                    name="first_name"
                    className="register_input_first"
                    value={registerEmployee.first_name}
                    placeholder="First Name"
                    onChange={handleChange}
            /><br />
                <label for="last_name" className="register_label">Last Name:</label>
                <input
                    id="register-last-name"
                    type="text" 
                    name="last_name"
                    className="register_input_last"
                    value={registerEmployee.last_name}
                    placeholder="Last Name"
                    onChange={handleChange}
            /><br />
                <label for="last_name" className="register_label">Email Address:</label>
                <input 
                    id="register-email"
                    type="text" 
                    name="email_address" 
                    className="register_input_email"
                    value={registerEmployee.email_address}
                    placeholder="Email Address"
                    onChange={handleChange}
            /><br />
            <br />
            <button className="submit">Submit</button>
            </form>
        </div>
    )
}


export default Register