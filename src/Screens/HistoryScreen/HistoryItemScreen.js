import {useParams} from "react-router-dom";
import axios from 'axios';
import {useEffect, useState} from "react";
import SingleGoalListItem from './SingleGoalListItem';

const HistoryScreen = () => {
    const [goal, setGoal] = useState([]);
    const {goalId} = useParams();
    
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    useEffect(() => {
        
            axios({
                method: 'get',
                url: 'goals-history/' + goalId
            }).then(res => {
                const data = JSON.parse(res.data);
                setGoal(data);
            });
        
      }, []); // eslint-disable-line react-hooks/exhaustive-deps
    console.log(goal);
    return(
        <section className="history-screen">
            <h1>History Item</h1>
            {goal.history && Object.keys(goal.history).sort().map(key => 
            <SingleGoalListItem key={key} stamp={key} goal={goal} days={days} />
            )}
            
        </section>
    );
}
export default HistoryScreen;