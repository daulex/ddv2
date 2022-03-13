import {NavLink} from "react-router-dom";
import {ButtonGoalRecordSimple} from "./ButtonGoalRecordSimple";

export const DailyGoals = ({goals, setGoals}) => {
    const setGoalStatus = (data) => {
        let res = goals.map(row => {
            if (row.ID === data[0]) {
                row.today = data[1] === 'complete' ? 1 : 0;
                if(data[1] === 'complete'){
                    row.weekly_total++;
                }else{
                    row.weekly_total--;
                }
            }

            return row;
        });

        setGoals(res);
    }

    return (
        <section className="goallist__daily">
            <h1>Daily goals</h1>
            <section className="in-progress">
                {goals.map(goal => (
                    <div className={"goal " + goal.goal_type.toLowerCase()[0]} key={goal.ID}>
                        {goal.goal_type === "Simple" ?
                            <ButtonGoalRecordSimple setGoalStatus={setGoalStatus} goal={goal}/>
                            :
                            <NavLink to={"/record/" + goal.ID}>
                                <span className="goal__title">{goal.title}</span>
                                <div className="today">
                                    <span className="count">{goal.today}</span>
                                    today
                                </div>
                            </NavLink>
                        }

                    </div>
                ))}
            </section>
        </section>
    );
}
  