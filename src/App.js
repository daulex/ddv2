import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.scss';
import {Header} from './Components/Header/Header';
import {GoalList} from './Components/GoalList/GoalList';
import {GoalForm} from './Components/GoalForm/GoalForm';
import {RecordGoal} from "./Components/RecordGoal/RecordGoal";
import AuthContainer from './Components/Auth/AuthContainer';
import VerifyEmail from './Components/Auth/VerifyEmail';
import {Context}    from './Components/Auth/UserContext.js';
import axios from "axios";


function App() {

  const [activeUser, setActiveUser] = useState(localStorage.getItem('token') || false);

  
  

  if(!activeUser){
    axios.defaults.baseURL = process.env.REACT_APP_DDAPI_DOMAIN;
    return (
        <Router>
          <Context.Provider  value={[activeUser, setActiveUser]}>
            <div className="App">
              <Header />
              <Routes>
                <Route path="/" element={<AuthContainer action="login" />} />
                <Route path="user/login" element={<AuthContainer action='login' />} />
                <Route path="user/register" element={<AuthContainer action='register' />} />
                <Route path="user/recover" element={<AuthContainer action='recover' />} />
                <Route path="user/reset" element={<AuthContainer action='reset' />} />
                <Route path="user/verify/:key" element={<VerifyEmail />} />
              </Routes>
            </div>
          </Context.Provider>
        </Router>
        );
  }

  axios.defaults.baseURL = process.env.REACT_APP_DDAPI;
  axios.defaults.headers.common = {'Authorization': `Bearer ${activeUser}`};
  return (
    <Router>
      <Context.Provider  value={[activeUser, setActiveUser]}>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<GoalList />} />
            <Route path="new-goal" element={<GoalForm />} />
            <Route path="/goal/edit/:goalId" element={<GoalForm />} />
            <Route path="/record/:recordId" element={<RecordGoal />} />
            <Route path="user/verify/:key" element={<VerifyEmail />} />
          </Routes>
        </div>
      </Context.Provider>
    </Router>
  );
}

export default App;
