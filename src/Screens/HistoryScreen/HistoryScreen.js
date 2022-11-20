import {NavLink} from "react-router-dom";
import axios from 'axios';
import {useEffect, useState} from "react";

const HistoryScreen = () => {
  const [goals, setGoals] = useState([]);
  
  useEffect(() => {
    
    axios({
      method: 'get',
      url: 'goals-history'
    }).then(res => {
      const data = JSON.parse(res.data);
      setGoals(data);
    });
    
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  return(
    <section className="history-list">
      <h1>History</h1>
      <div className="history-screen__goals">
      {goals && goals.length && goals.map(goal => {
        return(
          <div className="goal" key={"gid-"+goal.ID}>
            <NavLink to={"/history/" + goal.ID}>
              <strong className="goal__title">{goal.title}</strong> 
              <em>{goal.title_weekly}</em> 
              <span>{goal.goal_type.split(" ")[0]}</span>
            </NavLink>
        </div>
        )
      })}
      </div>
    </section>
  );
}
export default HistoryScreen;