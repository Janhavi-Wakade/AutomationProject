import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';
import Floor from './components/Floor';
import { useState } from 'react';
import Floorb2 from './components/Floorb2';
import './globalStyles.css'
import Login from './components/Login';

const App = () => {
  const[isAuth,setIsAuth]=useState(false);

  const handleLogin=()=>{
    setIsAuth(true);
  };
  return (
    <Router>
      <div>
      <header>
          <nav>
          <ul>
              {!isAuth ? (
                <li>
                  <NavLink to="/" align="left">Login</NavLink>
                </li>
              ) : (
                <>
                  <li className='navleft'>
                    <NavLink to="/wingA">WING A</NavLink>
                  </li>
                  <li className='navright'>
                    <NavLink to="/wingB">WING B</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} /> 
          <Route exact path="/wingB" element={<Floorb2 />} />
          <Route exact path="/wingA"  element={<Floor />}/> 
        </Routes>
        </div>
    </Router>
  );
};

export default App;