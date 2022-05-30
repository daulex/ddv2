import axios from "axios";

export const ButtonGoalRecordSimple = (props) => {
    const buttonClass = parseInt(props.goal.today) === 1 ? "complete" : "incomplete";

    const handleButtonClick = () => {

        axios({
            method: 'post',
            data: props.goal,
            url: process.env.REACT_APP_DDAPI + "goal/record/" + props.goal.ID
        }).then(() => {

            props.setGoalStatus([props.goal.ID, buttonClass === "complete" ? "incomplete" : "complete"]);

        })
    }
    return(
        <button className={buttonClass} onClick={handleButtonClick}>
            <span className="goal__title">{props.goal.title}</span>
        </button>
    );
}