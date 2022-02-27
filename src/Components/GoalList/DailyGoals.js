export const DailyGoals = (props) => {
    return (
      <section className="goallist__daily">
          <h2>Daily goals</h2>
          <section className="in-progress">
              <div className="goal simple">
                  <button>
                      <span className="goal__title">Daily duolingo streak</span>
                  </button>
              </div>
              <div className="goal custom">
                  <button>
                      <span className="goal__title">Push-ups</span>
                      <div className="today">
                          <span className="count">15</span>
                          today
                      </div>
                  </button>
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
  