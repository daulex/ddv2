import React, {useState, useContext} from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import {Context} from "../Auth/UserContext";

export const NewGoal = () => {
  const { register, getValues, handleSubmit, formState: {errors} } = useForm();
  const [activeUser] = useContext(Context);

  const onSubmit = data => {
    console.log(data);
    console.log(errors);

    const headers = {
      'Authorization': 'Bearer ' + activeUser
    };
    axios.post(
        process.env.REACT_APP_DDAPI + "goal",
        { data },
        { headers }
        ).then(res => {
          console.log(res);
    });
  };

  const [weeklyRepetitionsShowing, setWeeklyRepetitionsShowing] = useState(false);
  const showHideRepetitionsGoal = () => {
    if(getValues('goal_type') === "Custom repetitions"){
      setWeeklyRepetitionsShowing(true);
    }else{
      setWeeklyRepetitionsShowing(false);
    }
  }

  return (
    <section className="newgoal">
      <h1>New goal</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="field__label" htmlFor="title">Daily title</label>
          <input className="field__text" type="text" placeholder="Daily title" {...register("title", {required: true, maxLength: 80})} />
        </div>
        <div className="field">
          <label className="field__label" htmlFor="title_weekly">Weekly title</label>
          <input className="field__text" type="text" placeholder="Weekly title" {...register("title_weekly", {required: false, maxLength: 80})} />
        </div>

        <div className="field goal-type">
          <div className="field__label">Goal type</div>
            <div className="goal-type__option">
              <input {...register("goal_type", { required: true })} type="radio" id="goal_type__simple" value="Simple" />
              <label htmlFor="goal_type__simple">
                <strong>Simple</strong> <span>A basic, do it once per day goal</span>
              </label>
            </div>
            <div className="goal-type__option">
              <input {...register("goal_type", { required: true, onChange: showHideRepetitionsGoal })} type="radio" id="goal_type__custom" value="Custom repetitions" />
              <label htmlFor="goal_type__custom">
                <strong>Custom repetitions</strong> <span>Set a custom amount of repetitions of this goal per week and add a custom amount to the weekly total every day</span>
              </label>
            </div>
        </div>

        {weeklyRepetitionsShowing &&
          <div className="field">
            <label className="field__label" htmlFor="weekly_repetitions_goal">Weekly repetitions goal</label>
            <input type="number" className="field__text" placeholder="Weekly repetitions goal" {...register("weekly_repetitions_goal", {required: true, maxLength: 12})} />
          </div>
        }

        <div className="form-footer">
          <input type="submit" value="Create goal" />
        </div>
      </form>
    </section>
  );
}
