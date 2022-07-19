import React, {useState} from "react";
import {useNavigate} from "react-router-dom"


function CreateLog({employees}){
    const [newLog, setNewLog] = useState({
        employee_id: null,
        coffee_notes: "",
        needs: "",
        items_86ed: "",
        pastry_soldout: false,
        leftover_pastry: "",
        miscellaneous: "",
        created_on: new Date()
    })

    let navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:9292/daily_notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                coffee_notes: newLog.coffee_notes,
                needs: newLog.needs,
                items_86ed: newLog.items_86ed,
                pastry_soldout: newLog.pastry_soldout,
                leftover_pastry: newLog.leftover_pastry,
                miscellaneous: newLog.miscellaneous,
                created_on: newLog.created_on,
                employee_id: newLog.employee_id,
            }),
        })
        .then((r) => r.json())
        .then(response => {
            console.log(response)
            navigate("/home")
        })

    };

    const handleChange = (e) => {
        if (e.target.name === "employee_id"){
        setNewLog({
             ...newLog,
            [e.target.name]: parseInt(e.target.value)
            })
        } else
        setNewLog({
            ...newLog,
            [e.target.name]: e.target.value
        })
    }

    const handleRadio = (e) => {
        if (e.target.value === "true"){
            setNewLog({
                ...newLog,
                [e.target.name]: true
            })
        } else
            setNewLog({
                ...newLog,
                [e.target.name]: false
        })
    }
    
    const employeeName = employees.map ((employee) => {
        return <option key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name}</option>
    })

    return (
        <div className="create_log">
            <hr className="top_line"/>
            <h1 className="create_header">Create your log</h1>
            <form onSubmit={handleSubmit}>
                <h3 className="log_head">Employee</h3>
                    <select className="employee_select" name="employee_id" onChange={handleChange}>
                        <option value="choose" >Choose employee</option>
                        {employeeName}
                        </select>
                <h3 className="log_head">Coffee Notes:</h3>
                <input
                    type="type"
                    name="coffee_notes"
                    className="register_input"
                    value={newLog.coffee_notes}
                    onChange={handleChange} 
                    />
                <h3 className="log_head">Pastry Soldout:</h3>
                <input
                    type="radio"
                    name="pastry_soldout"
                    className="radio_input"
                    checked={newLog.pastry_soldout === true}
                    value={"true"}
                    onChange={handleRadio}
                    />
                True
                <input
                    type="radio"
                    name="pastry_soldout"
                    className="radio_input"
                    checked={newLog.pastry_soldout === false}
                    value={"false"}
                    onChange={handleRadio} 
                    />
                False
                <h5 className="log_head_small">Pastry Leftover:</h5>
                <input
                    type="type"
                    name="leftover_pastry"
                    className="create_input"
                    value={newLog.leftover_pastry} 
                    onChange={handleChange}
                    />
                <h3 className="log_head">Shop needs:</h3>
                <input
                    type="text"
                    name="needs"
                    className="create_input"
                    value={newLog.needs}
                    onChange={handleChange} 
                    />
                <h5 className="log_head_small">Inventory needed:</h5>
                <input
                    type="text"
                    name="items_86ed"
                    className="create_input"
                    value={newLog.items_86ed}
                    onChange={handleChange}
                    />
                <h3 className="log_head">Miscellaneous</h3>
                <textarea
                    type="text"
                    name="miscellaneous"
                    className="create_input"
                    value={newLog.miscellaneous} 
                    onChange={handleChange}
                    /><br></br>
                <button className="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateLog