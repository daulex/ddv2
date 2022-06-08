
import { ButtonEditGoal } from "./ButtonEditGoal";

export const WeeklyGoals = (props) => {
    

    return (
      <section className="goallist__weekly">
          <h2>Weekly goals</h2>
          <div className="in-progress">
              {props.goals.map(goal => <ButtonEditGoal key={goal.ID} goal={goal} />)}
          </div>
      </section>
    );
  }
  