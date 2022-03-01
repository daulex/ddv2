import {NavLink} from "react-router-dom";

export const DailyGoals = () => {
    return (
    <section className="goallist__daily">
          <h2>Daily goals</h2>
          <section className="in-progress">
              <div className="goal simple">
                <NavLink to="/">
                    <span className="goal__title">Daily duolingo streak</span>
                </NavLink>
              </div>
              <div className="goal custom">
                <NavLink to="/record/2">
                      <span className="goal__title">Push-ups</span>
                      <div className="today">
                          <span className="count">15</span>
                          today
                      </div>
                </NavLink>
              </div>
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
  