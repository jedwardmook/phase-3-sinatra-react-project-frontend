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
        <div>
            <h3>Create your log</h3>
            <form onSubmit={handleSubmit}>
                <h4>Employee</h4>
                    <select name="employee_id" onChange={handleChange}>
                        <option value="choose" >Choose employee</option>
                        {employeeName}
                        </select>
                <h4>Coffee Notes:</h4>
                <input
                    type="type"
                    name="coffee_notes"
                    value={newLog.coffee_notes}
                    onChange={handleChange} 
                    />
                <h4>Pastry Soldout:</h4>
                <input
                    type="radio"
                    name="pastry_soldout"
                    checked={newLog.pastry_soldout === true}
                    value={"true"}
                    onChange={handleRadio}
                    />
                True
                <input
                    type="radio"
                    name="pastry_soldout"
                    checked={newLog.pastry_soldout === false}
                    value={"false"}
                    onChange={handleRadio} 
                    />
                False
                <h5>Pastry Leftover:</h5>
                <input
                    type="type"
                    name="leftover_pastry"
                    value={newLog.leftover_pastry} 
                    onChange={handleChange}
                    />
                <h4>Shop needs:</h4>
                <input
                    type="text"
                    name="needs"
                    value={newLog.needs}
                    onChange={handleChange} 
                    />
                <h5>Inventory needed:</h5>
                <input
                    type="text"
                    name="items_86ed"
                    value={newLog.items_86ed}
                    onChange={handleChange}
                    />
                <h4>Miscellaneous</h4>
                <textarea
                    type="text"
                    name="miscellaneous"
                    value={newLog.miscellaneous} 
                    onChange={handleChange}
                    /><br></br>
                <button className="log-submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateLog