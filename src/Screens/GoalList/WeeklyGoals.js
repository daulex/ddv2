import {NavLink} from "react-router-dom";

export const WeeklyGoals = (props) => {
    const getWeeklyValue = (goal) => {
        const a = goal.weekly_total;
        const b = goal.goal_type === "Simple" ? "7" : goal.weekly_repetitions_goal;

        return `${a}/${b}`;
    }
    const getCompletionWidth = (goal) => {
        const x100 = parseInt(goal.weekly_total) * 100;
        const weeklyGoal = goal.goal_type === "Simple" ? 7 : parseInt(goal.weekly_repetitions_goal);
        return Math.floor( x100 / weeklyGoal) + "%";
    }

    return (
      <section className="goallist__weekly">
          <h2>Weekly goals</h2>
          <div className="in-progress">
              {props.goals.map(goal => (
                  <div className="goal weekly" key={goal.ID}>
                      <NavLink to={"/goal/edit/" + goal.ID}>
                          <span className="goal__title">{goal.title_weekly}</span>
                          <span className="weekly__progress">{getWeeklyValue(goal)}</span>
                          <span className="weekly__bar" style={{width: getCompletionWidth(goal)}} />
                      </NavLink>
                  </div>
              ))}
          </div>
      </section>
    );
  }
  