import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteButton from "../../Components/Shared/DeleteButton";


export const GoalDelete = (props) => {
    const navigate = useNavigate();

    const runDelete = () => {
        axios({
            method: 'delete',
            url: "goal/" + props.goalId
        }).then(res => {
            if(res.data === 200 && res.status === 200){
                navigate('/');
            }
        });
    }
    return(<DeleteButton runDelete={runDelete} label="Delete goal"/>);
}