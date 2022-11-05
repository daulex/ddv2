import { useState } from 'react';
import { Icon } from '../../../Components/IcoMoon/Icon';
import { days } from '../../../utilities';

export const HistoryInputCheckbox = ({value, day}) => {    
    const [isChecked, setIsChecked] = useState(value ? value : false)

    const checkHandler = () => {
        setIsChecked(!isChecked);
    }
    
    return(
        <div className={"edit-day" + (isChecked ? " checked" : "")}>
            <span>{days[day]}</span>
            <label className="edit-day__checkbox">
                <input onChange={checkHandler} type="checkbox" checked={isChecked} />
                <Icon icon={isChecked ? "check" : "close"} size="20px" />
            </label>
        </div>
        
    )
}