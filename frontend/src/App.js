import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './register';
import Login from './login';
import Home from './home';
// import Travel from './travel';
import Meetings from './meetings';
import Spa from './spa';
import About from './about';
import Navbar from './navbar';
import Meal from './meal'; // Import the Meal component

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/travel" element={<Travel />} /> */}
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/spa" element={<Spa />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/meal" element={<Meal />} /> {/* Add the Meal route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
