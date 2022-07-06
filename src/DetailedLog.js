import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

function DetailedLog(){
    const [detailedLog, setDetailedLog] = useState(null)

    let logId = useParams()
    const displayLog = logId.logId

    useEffect(() => {
        fetch(`http://localhost:9292/daily_notes/${displayLog}`)
          .then((r) => r.json())
          .then((response) => {
            setDetailedLog(response)
          });
      }, []);


    return (
      detailedLog?
        <div>
          <h1>Notes from: {new Date(detailedLog.created_on).toDateString()}</h1>
          <h4>Coffee notes:</h4>
          <p>{detailedLog.coffee_notes}</p>
          <h4>Pastry notes:</h4>
          {detailedLog.pastry_soldout? <p>✅ Soldout</p>:<p>Leftover: {detailedLog.leftover_pastry}</p>}
          <h4>Needs for the shop:</h4>
          <p>{detailedLog.needs}</p>
          <h5>86ed items:</h5>
          <p>{detailedLog.items_86ed}</p>
          <h4>Anything else:</h4>
          <p>{detailedLog.miscellaneous}</p>
        </div> : <h1>Loading</h1>
    )
}

export default DetailedLog