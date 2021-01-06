import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import chat from './components/Chat/chat';
import { home } from './components/Home/home';
import Navbar from './components/layout/navbar';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const url = 'http://localhost:5000/verifyuser';
        const res = await fetch(url, {
          headers: new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization,Origin,Accept'
          }),
          mode: 'cors',
          credentials: 'include'

        })
        const data = await res.json()
        setUser(data)
      } catch (error) {
        console.log(error);
      }
    }
    verifyUser()
  }, [])
  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={home} />
            <Route exact path="/chat/:room_id/:room_name" component={chat} />
            <Route exact path="/login" component={Login} />
            <Route path="/signup" component={Signup} />

          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
