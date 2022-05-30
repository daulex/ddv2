import {DailyGoals} from './DailyGoals';
import {WeeklyGoals} from './WeeklyGoals';
import axios from "axios";
import {useState, useEffect} from "react";

const GoalList = ({logOut}) => {

    const [goals, setGoals] = useState([]);

    useEffect(() => {

        axios.get("goal",).then(res => {
            setGoals(JSON.parse(res.data));
        }).catch(error => {
            if(error.response.status === 403){
                logOut();
            }
        });

    }, [logOut]);


    return (
        <section className="goallist">
            {goals.length > 0 &&
                <div>
                    <DailyGoals setGoals={setGoals} goals={goals}/>
                    <WeeklyGoals goals={goals}/>
                </div>
            }
        </section>
    );
}
export default GoalList;