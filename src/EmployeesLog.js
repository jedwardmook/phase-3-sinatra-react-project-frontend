import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function EmployeesLog(){
    const [employee, setEmployee] = useState([])
    const [dailyNotes, setDailyNotes] = useState([])
    const [isActive, setIsActive] = useState(false)

    let employeeId = useParams()
    const displayEmployee = employeeId.employeeId

    useEffect(() => {
        fetch(`http://localhost:9292/employees/${displayEmployee}`)
          .then((r) => r.json())
          .then((response) => {
            setEmployee(response)
            setDailyNotes(response.dailyNotes)
          });
      }, []);

    function handleDeleteClick() {
        fetch(`http://localhost:9292/employees/${displayEmployee}}`, {
          method: "DELETE",
        })
          .then((r) => r.json())
          .then((response) => console.log(response," Deleted"));
      }

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`http://localhost:9292/employees/${displayEmployee}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: employee.first_name,
            last_name: employee.last_name,
            email_address: employee.email_address
          }),
          })
          .then((r) => r.json())
          .then((response) => {
            console.log(response)
            setEmployee(response)
          });
          setIsActive(!isActive)
      }
    
    const handleToggle = () => {
        setIsActive(!isActive)
    }

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name] : e.target.value
        })
    }

    

    return (
        employee ?
        <div className="employee_info">
          <hr className="top_line"/>
          <h1 className="employee_header">{employee.first_name} {employee.last_name}</h1>
            <form className={isActive ? "toggle-form" : "toggle-edit"}>
              <div className="edit_div">
                <label for="first_name" className="register_label">Edit first name:</label>
                <input
                type="text"
                name="first_name"
                className="edit_first"
                value={employee.first_name}
                onChange={handleChange}
                /><br />
                <label for="first_name" className="register_label">Edit last name:</label>
                <input
                type="text"
                name="last_name"
                className="edit_last"
                value={employee.last_name}
                onChange={handleChange}
                />
              </div>
            </form>
          <h3 className="email_head">Email address: {employee.email_address}</h3>
            <form className={isActive ? "toggle-form" : "toggle-edit"}>
              <div className="edit_div">
              <label for="first_name" className="register_label">Edit email:</label>
              <input
              type="text"
              name="email_address"
              className="edit_email"
              value={employee.email_address}
              onChange={handleChange}
              /><br />
              </div>
            </form>
          <hr />
          <h4 className="employee_log_head">{employee.first_name} {employee.last_name}'s Logs:</h4>
          <hr className="employee_logs"/>
           {dailyNotes.map((note) => {
              return <p className="logs"><strong>Daily Log from: </strong><Link to={`/logs/${note.id}`}>{new Date(note.created_on).toDateString()}</Link></p>
          })}
          <br/>
          <button className="employee_button" onClick={handleToggle}>📝 Edit {employee.first_name} {employee.last_name}</button>
          <button className="employee_button" onClick={handleDeleteClick}>❌ Delete {employee.first_name} {employee.last_name}</button><br />
          <button className={isActive ? "submit" : "toggle-edit"} onClick={handleSubmit}>Submit</button>
        </div> : <h1>Employee Loading...</h1>
    )
}

export default EmployeesLog