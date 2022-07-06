import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function EmployeesLog(){
    const [employee, setEmployee] = useState([])
    const [dailyNotes, setDailyNotes] = useState([])

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

    

    return (
        employee ?
        <div>
            <div className="employee-info"></div>
            <h1>{employee.first_name} {employee.last_name}</h1>
            <h2>{employee.email_address}</h2>
             {dailyNotes.map((note) => {
                return <p>Notes from: <Link to={`/logs/${note.id}`}>{new Date(note.created_on).toDateString()}</Link></p>
            })}
            <form className="form"></form>
            <button>Edit {employee.first_name} {employee.last_name}</button>
            <button onClick={handleDeleteClick}>Delete {employee.first_name} {employee.last_name}</button>
        </div> : <h1>Employee Loading...</h1>
    )
}

export default EmployeesLog