import axios from "axios";
import {useState} from "react";
import NoticeSimple from "../../Components/Notices/NoticeSimple";


export const ButtonGoalRecordSimple = ({goal, setGoalStatus}) => {
    const buttonClass = parseInt(goal.today) === 1 ? "complete" : "incomplete";
    const [showNotice, setShowNotice] = useState(false);
    
    const handleButtonClick = () => {
        setGoalStatus([goal.ID, buttonClass === "complete" ? "incomplete" : "complete"]);
        if(buttonClass === "incomplete") {
            setShowNotice(true);
            setTimeout(() => {
                setShowNotice(false);
            }, 1500);
        }
        axios({
            method: 'post',
            data: goal,
            url: process.env.REACT_APP_DDAPI + "goal/record/" + goal.ID
        })
    }
    return(
        <div className="button-container">
            {showNotice && <NoticeSimple />}
            <button className={buttonClass} onClick={handleButtonClick}>
                <span className="goal__title">{goal.title}</span>
            </button>
        </div>
    );
}