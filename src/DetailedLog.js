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
        </div> : <h1>Loading</h1>
    )
}

export default DetailedLog