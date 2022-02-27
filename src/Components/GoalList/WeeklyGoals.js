export const WeeklyGoals = (props) => {
    return (
      <section className="goallist__weekly">
          <h2>Weekly goals</h2>
          <section className="in-progress">
              <div className="goal weekly">
                  <button>
                      <span className="goal__title">Swedish lessons</span>
                      <span className="weekly__progress">6/7</span>
                      <span className="weekly__bar" style={{width: `86%`}}></span>
                  </button>
              </div>
              <div className="goal weekly">
                  <button>
                      <span className="goal__title">200 Push-ups</span>
                      <span className="weekly__progress">40/200</span>
                      <span className="weekly__bar" style={{width: `20%`}}></span>
                  </button>
              </div>
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
  