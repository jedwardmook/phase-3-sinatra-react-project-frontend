import React from "react"
import {Link} from "react-router-dom"


function NavBar(){

    return (
    <div className="navbar">
        <Link to="/home"><button className="first_nav">Home</button></Link>
        <Link to="/create_log"><button className="nav">New Log</button></Link>
        <Link to="/employees"><button className="nav">Employees</button></Link>
        <Link to="/create_employee"><button className="nav">Register</button></Link>
        <hr className="top_line"/>
    </div>
    )
}

export default NavBar