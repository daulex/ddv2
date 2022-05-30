import axios from "axios";
import {useState} from "react";

export const ButtonGoalRecordSimple = ({goal, setGoalStatus}) => {
    const buttonClass = parseInt(goal.today) === 1 ? "complete" : "incomplete";
    const [processing, setProcessing] = useState(false);

    const handleButtonClick = () => {
        if(processing) return;
        setProcessing(true);
        setGoalStatus([goal.ID, buttonClass === "complete" ? "incomplete" : "complete"]);
        axios({
            method: 'post',
            data: goal,
            url: process.env.REACT_APP_DDAPI + "goal/record/" + goal.ID
        }).then(() => {
            setProcessing(false);
        })
    }
    return(
        <button className={buttonClass} onClick={handleButtonClick}>
            <span className="goal__title">{goal.title}</span>
        </button>
    );
}