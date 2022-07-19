import React from "react";
import { Link } from "react-router-dom";

function Employees({employees}){

    const employeeRow = employees.map((employee) => {
        return (
                <tr key={employee.id}>
                    <td className="item">{employee.first_name}</td>
                    <td className="item_spacing">{employee.last_name}</td>
                    <td className="item_spacing">{employee.email_address}</td>
                    <td className="item_center"><Link to={`/employees/${employee.id}`}>📝 </Link></td>
                </tr>
        )
    })

    return (
        <div className="employee_div">
            <hr className="top_line"/>
            <table className="employee_table">
                <tr>
                    <td className="category">First Name</td>
                    <td className="category">Last Name</td>
                    <td className="category">Email Address</td>
                    <td className="category">Logs</td>
                </tr>
                {employeeRow}
                
            </table>

    </div>
    )
}

export default Employees
