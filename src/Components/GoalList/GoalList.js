import {DailyGoals} from './DailyGoals';
import {WeeklyGoals} from './WeeklyGoals';
import axios from "axios";
import {useState, useContext, useEffect} from "react";
import {Context} from "../Auth/UserContext";

export const GoalList = (props) => {
    const [activeUser] = useContext(Context);

    const [goals, setGoals] = useState([]);
    useEffect(() => {
        const headers = {'Authorization': 'Bearer ' + activeUser };
        axios.get(
            process.env.REACT_APP_DDAPI + "goal",
            { headers }
        ).then(res => {
            setGoals( JSON.parse(res.data) );
        });
    }, [activeUser]);
  return (
    <section className="goallist">
        <DailyGoals goals={goals} />
        <WeeklyGoals goals={goals} />
    </section>
  );
}
