import axios from 'axios';
import {useEffect, useState} from "react";

const HistoryScreen = () => {
    const [goals, setGoals] = useState([]);
    
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    useEffect(() => {

        
            axios({
                method: 'get',
                url: 'goals-history'
            }).then(res => {
                const data = JSON.parse(res.data);
                // console.log(data);
                setGoals(data);
            });
        
      }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    return(
        <div className="history-screen">
            <h1>History</h1>
            <div className="history-screen__goals">
                {goals && goals.length && goals.map(goal => {
                    return(
                    <div className="goal" key={"gid-"+goal.ID}>
                        <h3>{goal.title} <em>({goal.title_weekly})</em><br/>{goal.goal_type}</h3>
                        {goal.history && Object.keys(goal.history).sort().map(key => {
                            return (
                                <div className="goal__history--week" key={"gh-"+key}>
                                    <h4>Week starting {key}</h4>
                                    {[0,1,2,3,4,5,6].map(day => {
                                        return(
                                            <div className="goal__history--day" key={"ghd-"+day}>
                                                <span>{days[day]}: </span> 
                                                <span>{goal.history[key][day]}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )
                        })}
                    </div>
                    )
                })}
            </div>
        </div>
    );
}
export default HistoryScreen;