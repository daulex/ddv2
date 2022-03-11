import {NavLink} from "react-router-dom";
import {ButtonGoalRecordSimple} from "./ButtonGoalRecordSimple";

export const DailyGoals = (props) => {
    return (
    <section className="goallist__daily">
          <h1>Daily goals</h1>
          <section className="in-progress">
              {props.goals.map(goal => (
                  <div className={"goal " + goal.goal_type.toLowerCase()[0]} key={goal.ID}>
                      {goal.goal_type === "Simple" ?
                          <ButtonGoalRecordSimple goal={goal} />
                          :
                          <NavLink to={"/record/" + goal.ID}>
                              <span className="goal__title">{goal.title}</span>
                              <div className="today">
                                  <span className="count">15</span>
                                  today
                              </div>
                          </NavLink>
                      }

                  </div>
              ))}

          </section>
          <section className="complete">
              <div className="goal complete">
                  <button>
                      <span className="goal__title">Make a todo list for tomorrow</span>
                  </button>
              </div>
          </section>
      </section>
    );
  }
  