import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

function EmployeesLog(){
    const [employee, setEmployee] = useState([null])

    let employeeId = useParams()
    const displayEmployee = employeeId.employeeId

    useEffect(() => {
        fetch(`http://localhost:9292/employees/${displayEmployee}`)
          .then((r) => r.json())
          .then((response) => {
            setEmployee(response)
          });
      }, []);



    return (
        <div>
            <h1>{employee.first_name} {employee.last_name}</h1>
        </div>
    )
}

export default EmployeesLog