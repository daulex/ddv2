import {useEffect, useState} from "react";
import axios from "axios";
import { GoalFormHistoryEdit } from "./GoalFormHistoryEdit";

const GoalFormHistory = ({id}) => {
    const [goal, setGoal] = useState([]);
    const [log, setLog] = useState([]);
    useEffect(() => {
        axios({
            method: 'get',
            url: 'goals-history/' + id
        }).then(res => {
            const data = JSON.parse(res.data);
            setGoal(data);
            if(data.history){
                setLog(Object.keys(data.history).reverse());
            }
            
        });
        
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div className="goal-form-history">
            <h1>Edit history</h1>
        {
            log.map(key => <GoalFormHistoryEdit key={key} week={key} goal={goal} />) 
        }
        </div>
    )
}
export default GoalFormHistory;