import { days,key_to_date } from "../../../utilities"
import {HistoryInputCheckbox} from "./HistoryInputCheckbox";

export const GoalFormHistoryEdit = ({week, goal}) => {
    
    return(
        <div className="edit-week">
            <h4>Week starting {key_to_date(week)}</h4>
            {[0,1,2,3,4,5,6].map(day => (
                <div className="edit-day" key={"ghd-"+week+"-"+day}>
                    <span>{days[day]}</span>
                    <HistoryInputCheckbox value={goal.history[week][day]} />
                </div>
            ))}
        </div>
    )
}