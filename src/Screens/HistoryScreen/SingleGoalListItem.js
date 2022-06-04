import { key_to_date } from "../../utilities";

const SingleGoalListItem = ({stamp, goal, days}) => {
    
    return (
        <div className="goal__history--week" key={goal.ID+"--"+stamp}>
            <h4>Week starting {key_to_date(stamp)}</h4>
            {[0,1,2,3,4,5,6].map(day => {
                return(
                    <div className="goal__history--day" key={"ghd-"+stamp+"-"+day}>
                        <span>{days[day]}: </span> 
                        <span>{goal.history[stamp][day]}</span>
                    </div>
                );
            })}
        </div>
    );
}
export default SingleGoalListItem;