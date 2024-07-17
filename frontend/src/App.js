import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';
import Floor from './components/Floor';
import Floorb2 from './components/Floorb2';
// import Home from './Home';
import './globalStyles.css'

const App = () => {
  return (
    <Router>
      <div className="App">
      <body>
      <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/building1">WING A</NavLink>
              </li>
              <li>
                <NavLink to="/building2">WING B</NavLink>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          {/* <Route index element={<Home />}/>  */}
          <Route exact path="/building2" element={<Floorb2 />} />
          <Route exact path="/building1"  element={<Floor />}/> 
        </Routes>
        </body>
        </div>
    </Router>
  );
};

export default App;
