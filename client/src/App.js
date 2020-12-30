import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React, {useState} from 'react';
import {UserContext} from './UserContext';
import chat from './components/Chat/chat';
import {home} from './components/Home/home';
import Navbar from './components/layout/navbar';
function App() {
  const [user, setUser] = useState(null)
  return (
    <Router>
    <div className="App">
      <UserContext.Provider value={{user,setUser}}>
      <Navbar/>
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/chat/:room_id/:room_name" component={chat} />
        </Switch>
      </UserContext.Provider>
    </div>
    </Router>
  );
}

export default App;
