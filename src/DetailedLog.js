import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

function DetailedLog(){
  const [detailedLog, setDetailedLog] = useState()
  const [editedLog, setEditedLog] = useState({
      coffee_notes: "",
      needs: "",
      items_86ed: "",
      pastry_soldout: false,
      leftover_pastry: "",
      miscellaneous: "",
  })
  const [isActive, setIsActive] = useState(false)

  let logId = useParams()
  const displayLog = logId.logId



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
        .then((response) => console.log(response," Deleted"));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:9292/daily_notes/${displayLog}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coffee_notes: editedLog.coffee_notes,
        needs: editedLog.needs,
        items_86ed: editedLog.items_86ed,
        pastry_soldout: editedLog.pastry_soldout,
        leftover_pastry: editedLog.leftover_pastry,
        miscellaneous: editedLog.miscellaneous, 
      }),
    })
      .then((r) => r.json())
      .then((response) => {
        console.log(response)
      });
      handleToggle()
      setDetailedLog(detailedLog)
  }

  const handleToggle = () => {
    setIsActive(!isActive)
  }

  const handleChange = (e) => {
    setEditedLog({
        ...editedLog,
        [e.target.name] : e.target.value
    })
  }

  const handleRadio = (e) => {
    if (e.target.value === "true"){
        setEditedLog({
            ...editedLog,
            [e.target.name]: true
        })
    } else
        setEditedLog({
            ...editedLog,
            [e.target.name]: false
    })
}


    return (
      detailedLog?
        <div>
          <h1>Notes from: {new Date(detailedLog.created_on).toDateString()}</h1>
          <h3>Created by: {detailedLog.employee.first_name} {detailedLog.employee.last_name}</h3>
          <h4>Coffee notes:</h4>
          <p>{detailedLog.coffee_notes}</p>
          <form className={isActive ? "toggle-form" : "toggle-edit"}>
            Edit coffee notes:
            <input
              type="text"
              name="coffee_notes"
              value={editedLog.coffee_notes}
              onChange={handleChange}
              /><br />
          </form>
          <h4>Pastry notes:</h4>
          {detailedLog.pastry_soldout? <p>✅ Soldout</p>:<p>Leftover: {detailedLog.leftover_pastry}</p>}
          <form className={isActive ? "toggle-form" : "toggle-edit"}>
            <p>Edit pastry notes:</p>
            Pastry soldout:
            <input
              type="radio"
              name="pastry_soldout"
              value={true}
              checked={editedLog.pastry_soldout === true}
              onChange={handleRadio}
              />True
            <input
              type="radio"
              name="pastry_soldout"
              value={false}
              checked={editedLog.pastry_soldout === false}
              onChange={handleRadio}
              />False<br />
            Pastry leftover:
            <input
              type="text"
              name="leftover_pastry"
              value={editedLog.leftover_pastry}
              onChange={handleChange}
              /><br />
          </form>
          <h4>Needs for the shop:</h4>
          <p>{detailedLog.needs}</p>
          <form className={isActive ? "toggle-form" : "toggle-edit"}>
          Edit needs:
            <input
              type="text"
              name="needs"
              value={editedLog.needs}
              onChange={handleChange}
              /><br />
          </form>
          <h5>86ed items:</h5>
          <p>{detailedLog.items_86ed}</p>
          <form className={isActive ? "toggle-form" : "toggle-edit"}>
           Edit 86ed items:
            <input
              type="text"
              name="items_86ed"
              value={editedLog.items_86ed}
              onChange={handleChange}
              /><br />
          </form>
          <h4>Anything else:</h4>
          <p>{detailedLog.miscellaneous}</p>
          <form className={isActive ? "toggle-form" : "toggle-edit"}>
            Edit anything else:
            <input
              type="text"
              name="miscellaneous"
              value={editedLog.miscellaneous}
              onChange={handleChange}
              /><br />
          </form>
          <button onClick={handleToggle}>📝Edit Log</button>
          <button onClick={handleDeleteClick}>❌Delete Log</button><br  />
          <button className={isActive ? "toggle-form" : "toggle-edit"} onClick={handleSubmit}>Submit</button>
        </div> : <h1>Loading</h1>
    )
}

export default DetailedLog