import {useState} from "react";

const DeleteButton = ({runDelete, label}) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const toggleConfirm = () => {
        setShowConfirm(!showConfirm);
    }
    return(
        <div className="delete-button">
            {showConfirm ?
                <div className="delete-button__confirmation">
                    <span className="delete-button__confirmation--confirm">Confirm?</span>
                    <button onClick={runDelete} className="delete">Delete</button>
                    <button onClick={toggleConfirm} className="cancel">Keep</button>
                </div>
                :
                <div className="delete-button__trigger">
                    <button onClick={toggleConfirm}>{label}</button>
                </div>
            }
        </div>
    );
}
export default DeleteButton;