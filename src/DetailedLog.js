import React, {useState, useEffect} from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function DetailedLog({getDailyLogs}){
  const [detailedLog, setDetailedLog] = useState()
  const [isActive, setIsActive] = useState(false)

  let logId = useParams()
  const displayLog = logId.logId
  let navigate = useNavigate()



  useEffect(() => {
      fetch(`http://localhost:9292/daily_notes/${displayLog}`)
        .then((r) => r.json())
        .then((response) => {
          setDetailedLog(response)
        });
    }, []);

  function handleDeleteClick() {
      fetch(`http://localhost:9292/daily_notes/${displayLog}}`, {
        method: "DELETE",
      })
        .then((r) => r.json())
        .then((response) => {
          console.log("Deleted", response)
          getDailyLogs()
          navigate("/home")
        });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:9292/daily_notes/${displayLog}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coffee_notes: detailedLog.coffee_notes,
        needs: detailedLog.needs,
        items_86ed: detailedLog.items_86ed,
        pastry_soldout: detailedLog.pastry_soldout,
        leftover_pastry: detailedLog.leftover_pastry,
        miscellaneous: detailedLog.miscellaneous, 
      }),
    })
      .then((r) => r.json())
      .then((response) => {
        console.log(response)
        getDailyLogs()
      });
      handleToggle()
      setDetailedLog(detailedLog)
  }

  const handleToggle = () => {
    setIsActive(!isActive)
  }

  const handleChange = (e) => {
    setDetailedLog({
        ...detailedLog,
        [e.target.name] : e.target.value
    })
  }

  const handleRadio = (e) => {
    if (e.target.value === "true"){
        setDetailedLog({
            ...detailedLog,
            [e.target.name]: true
        })
    } else
        setDetailedLog({
            ...detailedLog,
            [e.target.name]: false
    })
}


    return (
      detailedLog?
        <div className={isActive ? "employee_info_long": "employee_info"}>
          <hr className="top_line"></hr>
          <h1 className="employee_header">Notes from: {new Date(detailedLog.created_on).toDateString()}</h1>
          <h4 className="email_head">Created by: <Link to={`/employees/${detailedLog.employee.id}`}>{detailedLog.employee.first_name} {detailedLog.employee.last_name}</Link></h4>
          <br />
          <h3 className="log_head">Coffee notes:</h3>
          <p className="detailed_logs">{detailedLog.coffee_notes}</p>
          <form className={isActive ? "toggle-form" : "toggle-edit"}>
          <div className="edit_div">
            <label for="coffee_notes" className="register_label">Edit coffee notes:</label>
            <input
              type="text"
              name="coffee_notes"
              className="edit_detailed_log"
              value={detailedLog.coffee_notes}
              onChange={handleChange}
              /><br />
          </div>
          </form>
          <h3 className="log_head">Pastry notes:</h3>
          {detailedLog.pastry_soldout? <p className="detailed_logs">✅ Soldout</p>:<p className="detailed_logs">Leftover: {detailedLog.leftover_pastry}</p>}
          <form className={isActive ? "toggle-form" : "toggle-edit"}>
          <div className="edit_div">
            <p className="register_label">Edit pastry notes:</p>
            <label for="pastry_soldout" className="register_label">Pastry soldout:</label>
            <input
              type="radio"
              name="pastry_soldout"
              value={true}
              checked={detailedLog.pastry_soldout === true}
              onChange={handleRadio}
              />True
            <input
              type="radio"
              name="pastry_soldout"
              value={false}
              checked={detailedLog.pastry_soldout === false}
              onChange={handleRadio}
              />False<br />
            <label for="leftover_pastry" className="register_label">Pastry leftover: </label>
            <input
              type="text"
              name="leftover_pastry"
              className="edit_detailed_log"
              value={detailedLog.leftover_pastry}
              onChange={handleChange}
              /><br />
          </div>
          </form>
          <h3 className="log_head">Needs for the shop:</h3>
          <p className="detailed_logs">{detailedLog.needs}</p>
          <form className={isActive ? "toggle-form" : "toggle-edit"}>
          <div className="edit_div">
          <label for="needs" className="register_label">Edit needs for the shop:</label>
            <input
              type="text"
              name="needs"
              className="edit_detailed_log"
              value={detailedLog.needs}
              onChange={handleChange}
              /><br />
          </div>
          </form>
          <h4 className="log_head">86ed items:</h4>
          <p className="detailed_logs">{detailedLog.items_86ed}</p>
          <form className={isActive ? "toggle-form" : "toggle-edit"}>
          <div className="edit_div">
          <label for="items_86ed" className="register_label">Edit 86ed items:</label>
            <input
              type="text"
              name="items_86ed"
              className="edit_detailed_log"
              value={detailedLog.items_86ed}
              onChange={handleChange}
              /><br />
          </div>
          </form>
          <h3 className="log_head">Anything else:</h3>
          <p className="detailed_logs">{detailedLog.miscellaneous}</p>
          <form className={isActive ? "toggle-form" : "toggle-edit"}>
          <div className="edit_div">
          <label for="miscellaneous" className="register_label">Edit anything else:</label>
            <input
              type="text"
              name="miscellaneous"
              className="edit_detailed_log"
              value={detailedLog.miscellaneous}
              onChange={handleChange}
              /><br />
          </div>
          <br />
          </form>
          <button className="employee_button" onClick={handleToggle}>📝Edit Log</button>
          <button className="employee_button" onClick={handleDeleteClick}>❌Delete Log</button><br  />
          <br/>
          <button className={isActive ? "submit" : "toggle-edit"} onClick={handleSubmit}>Submit</button>
        </div> : <h1>Loading</h1>
    )
}

export default DetailedLog