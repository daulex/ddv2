import axios from 'axios';
import {useEffect, useState} from "react";
import HistoryListItem from './HistoryListItem';

const HistoryScreen = () => {
    const [goals, setGoals] = useState([]);
    
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
        <div className="history-screen">
            <h1>History</h1>
            <div className="history-screen__goals">
                {goals && goals.length && goals.map(goal => {
                    return(
                    <div className="goal" key={"gid-"+goal.ID}>
                        <h3>{goal.title} <em>({goal.title_weekly})</em><br/>{goal.goal_type}</h3>
                        {goal.history && Object.keys(goal.history).sort().map(key => 
                        <HistoryListItem key={key} stamp={key} goal={goal} days={days} />
                        )}
                    </div>
                    )
                })}
            </div>
        </div>
    );
}
export default HistoryScreen;