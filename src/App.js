import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.scss';
import {Header} from './Components/Header/Header';
import {GoalList} from './Components/GoalList/GoalList';
import {NewGoal} from './Components/NewGoal/NewGoal';
import {RecordGoal} from "./Components/RecordGoal/RecordGoal";
import AuthContainer from './Components/Auth/AuthContainer';
import {Context}    from './Components/Auth/UserContext.js';


function App() {

  const [activeUser, setActiveUser] = useState(localStorage.getItem('token') || false);

  if(!activeUser){
    return (
        <Router>
          <Context.Provider  value={[activeUser, setActiveUser]}>
            <div className="App">
              <Routes>
                <Route path="/" element={<AuthContainer action="login" />} />
                <Route path="user/login" element={<AuthContainer action='login' />} />
                <Route path="user/register" element={<AuthContainer action='register' />} />
                <Route path="user/recover" element={<AuthContainer action='recover' />} />
                <Route path="user/reset" element={<AuthContainer action='reset' />} />
                <Route path="user/verify" element={<AuthContainer action='verify' />} />
              </Routes>
            </div>
          </Context.Provider>
        </Router>
        );
  }

  return (
    <Router>
      <Context.Provider  value={[activeUser, setActiveUser]}>
        <div className="App">
          <Header />


          <Routes>
            <Route path="/" element={<GoalList />} />
            <Route path="new-goal" element={<NewGoal />} />
            <Route path="/record/:recordId" element={<RecordGoal />} />
          </Routes>
        </div>
      </Context.Provider>
    </Router>
  );
}

export default App;
