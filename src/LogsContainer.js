import React from "react";
import Logs from "./Logs";

function LogsContainer({dailyLogs, employees}){

    
    const dailyLogsToDisplay = dailyLogs.map((dailyLog) => {
            return <Logs
                    dailyLog ={dailyLog}
                    key={dailyLog.id}
                    employees = {employees}
                    />
            })

    return (
        <div className="log">
            {dailyLogsToDisplay}
        </div>
    )
}

export default LogsContainer