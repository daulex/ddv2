import { useState } from 'react';

export const HistoryInputCheckbox = ({value}) => {    
    const [isChecked, setIsChecked] = useState(value ? value : false)

    const checkHandler = () => {
        setIsChecked(!isChecked);
    }
    
    return(
        <div className="edit-day__checkbox">
            <input onChange={checkHandler} type="checkbox" checked={isChecked} />
        </div>
    )
}