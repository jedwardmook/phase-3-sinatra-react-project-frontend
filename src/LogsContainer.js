import React, {useState} from "react";
import Logs from "./Logs";
import Filters from "./Filters";
import right_arrow from './images/right_arrow.png'
import left_arrow from './images/left_arrow.png'

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
            <Filters 
                employees = {employees}
                filteredSelectedEmployee = {filteredSelectedEmployee}
                filteredEmployee = {filteredEmployee}
                filteredSelectedMonth = {filteredSelectedMonth}
                filteredMonth = {filteredMonth}
                />
            {dailyLogsToDisplay.length > 0 ? dailyLogsToDisplay : <p>No logs to display</p>}
            <p className="display-counter">Showing {startingNumber} to {(startingNumber + displayNumber)}</p>
            <div className="display-buttons">
                <img className="decrease" onClick={decreaseStartingNumber} src={left_arrow}/>
                <img className="increase" onClick={increaseStartingNumber} src={right_arrow}/>
            </div>
        </div>
    )
}

export default LogsContainer