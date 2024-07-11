import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './register';
import Login from './login';
import Home from './home';
import Hotels from './hotels';
import Meetings from './meetings';
import Spa from './spa';
import About from './about';
import Navbar from './navbar';

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
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/spa" element={<Spa />} />
          <Route path="/about" element={<About />} />         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
