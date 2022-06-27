import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from './Header';
import Login from './Login';
import Register from './Register';


function App() {
  return (
    <Router>
      <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
