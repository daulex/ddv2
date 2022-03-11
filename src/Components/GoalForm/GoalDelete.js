import {useContext, useState} from "react";
import axios from "axios";
import {Context} from "../Auth/UserContext";


export const GoalDelete = (props) => {
    const [activeUser] = useContext(Context);
    const [showConfirm, setShowConfirm] = useState(false);
    const toggleConfirm = () => {
        setShowConfirm(!showConfirm);
    }
    const runDelete = () => {
        const headers = {
            'Authorization': 'Bearer ' + activeUser
        };

        axios({
            method: 'delete',
            url: process.env.REACT_APP_DDAPI + "goal/" + props.goalId,
            headers: headers
        }).then(res => {
            if(res.data === 200 && res.status === 200){
                window.location.assign("/");
            }
        });
    }
    return(
        <div className="goal-delete">
            {showConfirm ?
                <div className="goal-delete__confirmation">
                    <span className="goal-delete__confirmation--confirm">Confirm?</span>
                    <button onClick={runDelete} className="delete">Delete</button>
                    <button onClick={toggleConfirm} className="cancel">Keep</button>
                </div>
                :
                <div className="goal-delete__trigger">
                    <button onClick={toggleConfirm}>Delete</button>
                </div>
            }
        </div>
    )
}