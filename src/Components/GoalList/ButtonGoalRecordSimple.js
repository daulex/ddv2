import {useContext} from "react";
import {Context} from "../Auth/UserContext";
import axios from "axios";

export const ButtonGoalRecordSimple = (props) => {
    const [activeUser] = useContext(Context);
    const handleButtonClick = () => {
        console.log(props.goal);
        const headers = {
            'Authorization': 'Bearer ' + activeUser
        };

        axios({
            method: 'post',
            data: props.goal,
            url: process.env.REACT_APP_DDAPI + "goal/record/" + props.goal.ID,
            headers: headers
        }).then(res => {
            console.log(res.data);
            // if(res.data === 200 && res.status === 200){
            //     window.location.assign("/");
            // }
        });
    }
    return(
        <button onClick={handleButtonClick}>
            <span className="goal__title">{props.goal.title}</span>
        </button>
    );
}