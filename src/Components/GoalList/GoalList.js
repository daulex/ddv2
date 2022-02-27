import {DailyGoals} from './DailyGoals';
import {WeeklyGoals} from './WeeklyGoals';

export const GoalList = (props) => {
  return (
    <section className="goallist">
        <DailyGoals />
        <WeeklyGoals />
    </section>
  );
}
