import { useNavigate } from "react-router-dom";

export const ButtonGoalRecordCustom = ({goal}) => {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        const url = "/record/" + goal.ID;
        navigate(url, {state: {goal: goal}})
    }
    return(
        <button onClick={handleButtonClick}>
            <span className="goal__title">{goal.title}</span>
            <div className="today">
                <span className="count">{goal.today}</span>
                today
            </div>
        </button>
    );
}