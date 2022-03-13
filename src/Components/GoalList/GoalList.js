import {DailyGoals} from './DailyGoals';
import {WeeklyGoals} from './WeeklyGoals';
import axios from "axios";
import {useState, useEffect} from "react";

export const GoalList = () => {

    const [goals, setGoals] = useState([]);

    useEffect(() => {

        axios.get("goal",).then(res => {
            setGoals(JSON.parse(res.data));
        });

    }, []);


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
