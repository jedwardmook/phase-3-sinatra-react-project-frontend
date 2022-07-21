import React from "react";

function Filters({employees, filteredSelectedEmployee, filteredEmployee, filteredSelectedMonth, filteredMonth}){

    const employeesToBeFiltered = employees.map ((employee) => {
        return <option key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name}</option>
    })

    return (
        <div className="filters">
            <hr className="top_line"/>
            <span className="employee_span">Filter logs by Employee:</span>
                <select
                    name="employee-filter"
                    className="employee_filter"
                    onChange={filteredSelectedEmployee}
                    value={filteredEmployee}
                >
                    <option value="All">All</option>
                    {employeesToBeFiltered}
                </select>
            <span className="month_span">Filter logs by Month:</span>
                <select
                    name="month-filter"
                    className="month_filter"
                    onChange={filteredSelectedMonth}
                    value={filteredMonth}
                >
                    <option value="All">All</option>
                    <option value="0">January</option>
                    <option value="1">February</option>
                    <option value="2">March</option>
                    <option value="3">April</option>
                    <option value="4">May</option>
                    <option value="5">June</option>
                    <option value="6">July</option>
                    <option value="7">August</option>
                    <option value="8">September</option>
                    <option value="9">October</option>
                    <option value="10">November</option>
                    <option value="11">December</option>
                </select>
            <hr />
        </div>
    )


}

export default Filters