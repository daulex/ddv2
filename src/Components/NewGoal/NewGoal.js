import React from "react";
import { useForm } from "react-hook-form";

export const NewGoal = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);


  return (
    <section className="newgoal">
      <h1>New goal</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label htmlFor="title">Daily title</label>
          <input type="text" placeholder="Daily title" {...register("title", {required: true, maxLength: 80})} />
        </div>
        <div className="field">
          <label htmlFor="title_weekly">Weekly title</label>
          <input type="text" placeholder="Weekly title" {...register("title_weekly", {required: false, maxLength: 80})} />
        </div>

        <div className="field goal-type">
          <div className="label">Goal type</div>
            <div className="goal-type__option">
              <input {...register("goal_type", { required: true })} type="radio" id="goal_type__simple" value="Simple" />
              <label htmlFor="goal_type__simple">
                <strong>Simple</strong> <span>A basic, do it once per day goal</span>
              </label>
            </div>
            <div className="goal-type__option">
              <input {...register("goal_type", { required: true })} type="radio" id="goal_type__custom" value="Custom repetitions" />
              <label htmlFor="goal_type__custom">
                <strong>Custom repetitions</strong> <span>Set a custom amount of repetitions of this goal per week and add a custom amount to the weekly total every day</span>
              </label>
            </div>
        </div>

        
        <input type="number" placeholder="Weekly repetitions goal" {...register("Weekly repetitions goal", {required: true, maxLength: 12})} />

        <input type="submit" />
      </form>
    </section>
  );
}
