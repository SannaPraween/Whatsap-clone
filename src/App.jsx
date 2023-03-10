import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
// This is react router 5
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// React Router 6
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './StateProvider';

const App = () => {
  const [{ user }, dispatch] = useStateValue();

  // for dark mode
  const [mode, setMode] = useState('mageanta');
  const handleChange = (event) => {
    if (mode === 'mageanta') {
      setMode('black');
      // document.body.style.backgroundColor = '#08112cf7';
      console.log(mode);
    } else {
      setMode('mageanta');
      // document.body.style.backgroundColor = 'white';
      console.log(mode);
    }
  };

  // console.log(user);

  return (
    // BEM convention
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          {/* Router version 5 */}
          {/* <Router>
          <Sidebar />

          <Switch>
            <Route path="/">
              <Chat />
            </Route>

            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
          </Switch>
        </Router> */}

          {/* Router version 6 */}

          <Router>
            <Sidebar setTheme={handleChange} mode={mode} />
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path="/rooms/:roomId" element={<Chat />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;
