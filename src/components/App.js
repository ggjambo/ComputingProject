//Imports for react, browser router, chats.js, and login.js
import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { AuthProvider } from "../contexts/AuthContext"

import { useEffect, useState } from 'react';
import { ChatEngine } from 'react-chat-engine';
import axios from 'axios';

import Chats from "./Chats"
import Login from "./Login"
import Feed from "./Feed"
import SearchBar from "./SearchBar"
import Profile from './Profile';


//React Context one big object contains all user data and wraps all other components
//AuthProvider handling the application state
function App() {
  const [userName, setUserName] = useState();
  const [userSecret, setUserSecret] = useState();
  
  useEffect(() => {
    // Fetch user details on app load
    fetch('/api/user')
      .then(res => res.json())
      .then(user => {
        setUserName(user.email);
        setUserSecret(user.uid);
      });
  }, []);

  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/chats" component={Chats}/>
            <Route path="/feed" component={Feed} />
            <Route path="/searchbar" component={SearchBar} />
            <Route path="/profile" component={Profile}/>
            <Route path="/" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App;
