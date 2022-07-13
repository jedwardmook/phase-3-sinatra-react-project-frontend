import React from "react";
import { Link } from "react-router-dom";
import Logs from "./Logs";

function LogsContainer({dailyLogs}){

    
    const dailyLogsToDisplay = dailyLogs.map((dailyLog) => {
            return <Logs
                    dailyLog ={dailyLog}
                    key={dailyLog.id}
                    />
            })

    return (
        <div className="log-container">
            <Link to="/create_log"><button>Create New</button></Link>
            {dailyLogsToDisplay}
        </div>
    )
}

export default LogsContainer