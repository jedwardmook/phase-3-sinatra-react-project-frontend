import React from "react";
import { Link } from "react-router-dom";

function Logs({dailyLog}){

    const {created_on} = dailyLog
    const logDate = new Date(created_on).toDateString()

    const full_name = dailyLog.employee.first_name + ' ' + dailyLog.employee.last_name

    return (
        <div>
            <p><strong>Daily log from: </strong><Link to={`/logs/${dailyLog.id}`}>{logDate}</Link>. <strong>Created by:</strong> {full_name}.</p>
        </div>
    )
}

export default Logs