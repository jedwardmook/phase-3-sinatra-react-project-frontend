import React from "react";
import { Link } from "react-router-dom";

function Logs({dailyLog}){

    const {created_on} = dailyLog
    const logDate = new Date(created_on).toDateString()

    const full_name = dailyLog.employee.first_name + ' ' + dailyLog.employee.last_name
    const employee = dailyLog.employee

    return(
        <div className="logs">
            <p><strong>Daily log from: </strong><Link to={`/logs/${dailyLog.id}`}>{logDate}</Link>. <strong>Created by:</strong> <Link to={`/employees/${employee.id}`}>{full_name}</Link>.</p>
        </div>
    )
}

export default Logs