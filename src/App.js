import { useEffect,useState } from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from './Header';
import Register from './Register';
import LogsContainer from './LogsContainer';
import DetailedLog from './DetailedLog'
import Employees from "./Employees";
import EmployeesLog from "./EmployeesLog";
import CreateLog from "./CreateLog";
import './App.css';
import Footer from "./Footer";
import NavBar from "./NavBar";

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
      <NavBar />
      <Routes>
        <Route path='/create_employee' element={<Register />} />
        <Route path='/create_log' element={<CreateLog 
            employees={employees}/>} 
            />
        <Route path='/home' element={
          <LogsContainer 
            dailyLogs = {dailyLogs}
            employees = {employees} />} 
            />
        <Route exact path={`/logs/:logId`} element={<DetailedLog />} />
        <Route exact path='/employees' element={
          <Employees
            employees={employees} />} 
            />
        <Route exact path={`/employees/:employeeId`} element={
          <EmployeesLog 
            employees={employees} />}
            />
      </Routes>
    </div>
    <Footer />
    </Router>
  );
}

export default App;
