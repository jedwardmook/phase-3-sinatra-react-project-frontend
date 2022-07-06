import React from "react";
import { Link } from "react-router-dom";

function Employees({employees}){

    const employeeRow = employees.map((employee) => {
        return (
            <div>
                <tr key={employee.id}>
                    <td><Link to={`/employees/${employee.id}`}>📝 </Link></td>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.email_address}</td>
                </tr>
            </div>
        )
    })

    return <div>
        <table className="employee-table">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Address</th>
                </tr>
            </thead>
            <tbody>
                {employeeRow}
            </tbody>

        </table>

    </div>
}

export default Employees
