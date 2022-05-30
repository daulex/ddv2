import React, { useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import axios from "axios";

import {Context}    from './Components/Auth/UserContext.js';
import './App.scss';

import Header from './Components/Header/Header';
import AuthContainer from './Components/Auth/AuthContainer';
import VerifyEmail from './Components/Auth/VerifyEmail';

import GoalList from './Screens/GoalList/GoalList';
import GoalForm from './Screens/GoalForm/GoalForm';
import RecordGoal from "./Screens/RecordGoal/RecordGoal";
import MyAccount from "./Screens/MyAccount/MyAccount";
import HistoryScreen from "./Screens/HistoryScreen";


function App() {
  const [activeUser, setActiveUser] = useState(localStorage.getItem('token') || false);
  const logOut = () => {
    localStorage.removeItem('token');
    setActiveUser(false);
    window.history.pushState('dailyDo', '','/');
    window.location.reload();
  }
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
            <Route path="/" element={<GoalList logOut={logOut} />} />
            <Route path="new-goal" element={<GoalForm />} />
            <Route path="history" element={<HistoryScreen />} />
            <Route path="my-account" element={<MyAccount setActiveUser={setActiveUser} />} />
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
