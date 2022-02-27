import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.scss';
import {Header} from './Components/Header/Header';
import {GoalList} from './Components/GoalList/GoalList';
import {NewGoal} from './Components/NewGoal/NewGoal';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <Routes>
          <Route path="/" element={<GoalList />} />
          <Route path="new-goal" element={<NewGoal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
