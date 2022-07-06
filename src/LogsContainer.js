import React from "react";
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
            <button>Create New</button>
            {dailyLogsToDisplay}
        </div>
    )
}

export default LogsContainer