import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function EmployeesLog(){
    const [employee, setEmployee] = useState([])
    const [dailyNotes, setDailyNotes] = useState([])
    const [editedEmployee, setEditedEmployee] = useState({
        first_name: employee.first_name,
        last_name: employee.last_name,
        email_address: employee.email_address
    })
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
            first_name: editedEmployee.first_name,
            last_name: editedEmployee.last_name,
            email_address: editedEmployee.email_address
          }),
        })
          .then((r) => r.json())
          .then((response) => {
            console.log(response)
            setEmployee(response)
          });
      }
    
    const handleToggle = () => {
        setIsActive(!isActive)
    }

    const handleChange = (e) => {
        setEditedEmployee({
            ...editedEmployee,
            [e.target.name] : e.target.value
        })
    }

    

    return (
        employee ?
        <div>
            <div className="employee-info"></div>
            <h1>{employee.first_name} {employee.last_name}</h1>
            <form className={isActive ? "toggle-form" : "toggle-edit"}>
            Edit first name:
            <input
              type="text"
              name="first_name"
              value={editedEmployee.first_name}
              onChange={handleChange}
              /><br />
            Edit last name:
            <input
              type="text"
              name="last_name"
              value={editedEmployee.last_name}
              onChange={handleChange}
              />
            </form>
            <h2>{employee.email_address}</h2>
            <form className={isActive ? "toggle-form" : "toggle-edit"}>
            Edit email:
            <input
              type="text"
              name="email_address"
              value={editedEmployee.email_address}
              onChange={handleChange}
              /><br />
          </form>
             {dailyNotes.map((note) => {
                return <p>Notes from: <Link to={`/logs/${note.id}`}>{new Date(note.created_on).toDateString()}</Link></p>
            })}
            <form className="form"></form>
            <button onClick={handleToggle}>📝 Edit {employee.first_name} {employee.last_name}</button>
            <button onClick={handleDeleteClick}>❌ Delete {employee.first_name} {employee.last_name}</button><br />
            <button className={isActive ? "toggle-form" : "toggle-edit"} onClick={handleSubmit}>Submit</button>

        </div> : <h1>Employee Loading...</h1>
    )
}

export default EmployeesLog