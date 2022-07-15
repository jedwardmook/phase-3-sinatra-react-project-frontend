import React, {useState} from "react";
import { Link } from "react-router-dom";
import Logs from "./Logs";
import Filters from "./Filters";

function LogsContainer({dailyLogs, employees}){
    const [filteredEmployee, setFilteredEmployee] = useState("All")
    const [filteredMonth, setFilteredMonth] = useState("All")
    const [startingNumber, setStartingNumber] = useState(0)

    const filteredSelectedEmployee = (e) => {
        setFilteredEmployee(e.target.value)
    }

    const filteredSelectedMonth = (e) => {
        setFilteredMonth(e.target.value)
    }

    const logsFilteredByEmployee = dailyLogs
        .filter(dailyLog =>{
            if (filteredEmployee === "All")
                return dailyLogs
            else
                return dailyLog.employee_id === parseInt(filteredEmployee)
        })

    const logsFilteredByMonth = () => {
        if (filteredMonth === "All"){
                return logsFilteredByEmployee
        }else{
            return logsFilteredByEmployee.filter(dailyLog => {
                if (parseInt(filteredMonth) === new Date(dailyLog.created_on).getMonth())
                return dailyLog
            })
        }}

    const displayNumber = 10

    const increaseStartingNumber = () => {
        setStartingNumber(startingNumber + displayNumber)
    }

    const decreaseStartingNumber = () => {
        setStartingNumber(startingNumber - displayNumber)
    }

    const dailyLogsToDisplay = logsFilteredByMonth().slice(startingNumber, startingNumber + displayNumber).map((dailyLog) => {
            return <Logs
                    dailyLog ={dailyLog}
                    key={dailyLog.id}
                    />
            })

    return (
        <div className="log-container">
            <Link to="/create_log"><button>Create New</button></Link>
            <Filters 
                employees = {employees}
                filteredSelectedEmployee = {filteredSelectedEmployee}
                filteredEmployee = {filteredEmployee}
                filteredSelectedMonth = {filteredSelectedMonth}
                filteredMonth = {filteredMonth}
                />
            {dailyLogsToDisplay.length > 0 ? dailyLogsToDisplay : <p>No logs to display</p>}
            <p>Showing {startingNumber} to {(startingNumber + displayNumber)}</p>
            <button onClick={decreaseStartingNumber}>⬅️</button>
            <button onClick={increaseStartingNumber}>➡️</button>
        </div>
    )
}

export default LogsContainer