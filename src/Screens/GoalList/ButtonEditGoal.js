import { useNavigate } from "react-router-dom";

export const ButtonEditGoal = ({ goal }) => {
    const navigate = useNavigate();
    const getWeeklyValue = (goal) => {
        const a = goal.weekly_total;
        const b = goal.goal_type === "Simple" ? "7" : goal.weekly_repetitions_goal;

        return `${a}/${b}`;
    }
    const getCompletionWidth = (goal) => {
        const x100 = parseInt(goal.weekly_total) * 100;
        const weeklyGoal = goal.goal_type === "Simple" ? 7 : parseInt(goal.weekly_repetitions_goal);
        return Math.floor( x100 / weeklyGoal) + "%";
    }
    const handleButtonClick = () => {
        const url = "/goal/edit/" + goal.ID;
        navigate(url, { state: { goal: goal } })
    }
    return(
        <div className="goal weekly">
            <button onClick={handleButtonClick}>
                <span className="goal__title">{goal.title_weekly}</span>
                <span className="weekly__progress">{getWeeklyValue(goal)}</span>
                <span className="weekly__bar" style={{width: getCompletionWidth(goal)}} />
            </button>
        </div>
    );
}