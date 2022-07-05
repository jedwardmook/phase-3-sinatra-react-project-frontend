import { useEffect,useState } from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from './Header';
import Login from './Login';
import Register from './Register';
import LogsContainer from './LogsContainer';
import DetailedLog from './DetailedLog'
import Employees from "./Employees";


function App() {
  const [dailyLogs, setDailyLogs] = useState([])
  const [employees, setEmployees] = useState([])

    useEffect(() => {
        fetch("http://localhost:9292/daily_notes")
          .then((r) => r.json())
          .then((response) => {
            setDailyLogs(response)
          });
      }, []);

    useEffect(() => {
        fetch("http://localhost:9292/employees")
          .then((r) => r.json())
          .then((response) => {
            setEmployees(response)
          });
      }, []);

  return (
    <Router>
      <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/logs' element={
          <LogsContainer 
            dailyLogs = {dailyLogs} />} 
            />
        <Route exact path={`/logs/:logId`} element={<DetailedLog />} />
        <Route exact path='/employees' element={
          <Employees
            employees={employees} />} 
            />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
