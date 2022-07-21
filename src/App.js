import { useEffect,useState } from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from './Header';
import Register from './Register';
import LogsContainer from './LogsContainer';
import DetailedLog from './DetailedLog'
import Employees from "./Employees";
import DetailedEmployee from "./DetailedEmployee";
import CreateLog from "./CreateLog";
import './App.css';
import Footer from "./Footer";
import NavBar from "./NavBar";

function App() {
  const [dailyLogs, setDailyLogs] = useState([])
  const [employees, setEmployees] = useState([])

    useEffect(() => {
        getDailyLogs();
      }, []);

    const getDailyLogs = () => {
      fetch("http://localhost:9292/daily_notes")
          .then((r) => r.json())
          .then((response) => {
            setDailyLogs(response)
          })
    }

    useEffect(() => {
      getEmployees();
      }, []);

  
    const getEmployees = () => {
      fetch("http://localhost:9292/employees")
        .then((r) => r.json())
        .then((response) => {
          setEmployees(response)
        });
    }

  return (
    <Router>
      <div className="App">
      <Header />
      <NavBar />
      <Routes>
        <Route path='/create_employee' element={<Register
            getEmployees = {getEmployees} />} 
            />
        <Route path='/create_log' element={<CreateLog 
            employees= {employees}
            getDailyLogs = {getDailyLogs} />} 
            />
        <Route path='/home' element={
          <LogsContainer 
            dailyLogs = {dailyLogs}
            employees = {employees} />} 
            />
        <Route exact path={`/logs/:logId`} element={
          <DetailedLog 
            getDailyLogs = {getDailyLogs} />} 
            />
        <Route exact path='/employees' element={
          <Employees
            employees= {employees} />} 
            />
        <Route exact path={`/employees/:employeeId`} element={
          <DetailedEmployee 
            employees={employees} 
            getEmployees= {getEmployees} />}
            />
      </Routes>
    </div>
    <Footer />
    </Router>
  );
}

export default App;
