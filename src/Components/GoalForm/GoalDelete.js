import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const GoalDelete = (props) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();
    const toggleConfirm = () => {
        setShowConfirm(!showConfirm);
    }
    const runDelete = () => {
        axios({
            method: 'delete',
            url: process.env.REACT_APP_DDAPI + "goal/" + props.goalId
        }).then(res => {
            if(res.data === 200 && res.status === 200){
                navigate('/');
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