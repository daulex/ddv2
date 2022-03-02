import {NavLink} from "react-router-dom";

export const WeeklyGoals = (props) => {
    const getWeeklyValue = (goal) => {
        const a = "?";
        const b = goal.goal_type === "Simple" ? "7" : goal.weekly_repetitions_goal;
        console.log(goal);
        return `${a}/${b}`;
    }
    const getCompletionWidth = (goal) => {
        return Math.floor(Math.random()*100) + "%";
    }
    return (
      <section className="goallist__weekly">
          <h2>Weekly goals</h2>
          <section className="in-progress">
              {props.goals.map(goal => (
                  <div className="goal weekly" key={goal.ID}>
                      <NavLink to={"/goal/" + goal.ID}>
                          <span className="goal__title">{goal.title}</span>
                          <span className="weekly__progress">{getWeeklyValue(goal)}</span>
                          <span className="weekly__bar" style={{width: getCompletionWidth(goal)}}></span>
                      </NavLink>
                  </div>
              ))}
          </section>
          <section className="complete">
             <div className="goal weekly complete">
                  <button>
                      <span className="goal__title">Daily todo lists</span>
                      <span className="weekly__progress">7/7</span>
                  </button>
              </div>
          </section>
      </section>
    );
  }
  