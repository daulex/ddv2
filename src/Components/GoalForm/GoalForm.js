import React, {useState, useContext, useEffect} from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import {Context} from "../Auth/UserContext";
import {useParams} from "react-router-dom";

export const GoalForm = () => {
  const {goalId} = useParams();
  const { register, getValues, handleSubmit, reset } = useForm();
  const [activeUser] = useContext(Context);

  const [submitButtonIsActive, setSubmitButtonIsActive] = useState(true);
  const [weeklyRepetitionsShowing, setWeeklyRepetitionsShowing] = useState(false);

  let form = {
    headers: {'Authorization': 'Bearer ' + activeUser},
    submit: "Submit"
  };
  if(typeof goalId !== 'undefined'){
    form.title = "Edit goal";
    form.type = "edit";
    form.method = "put";
    form.submit = "Update goal";
    form.url = process.env.REACT_APP_DDAPI + "goal/" + goalId;
  }else{
    form.title = "New goal";
    form.type = "new";
    form.method = "post";
    form.submit = "Create goal";
    form.url = process.env.REACT_APP_DDAPI + "goal";
  }

  const [submitButton, setSubmitButton] = useState(form.submit);

  useEffect(() => {

    if(form.type === "edit"){
      axios({
        method: 'get',
        url: form.url,
        headers: form.headers
      }).then(res => {
        const data = JSON.parse(res.data);
        reset({
          title: data.title,
          title_weekly: data.title_weekly,
          goal_type: data.goal_type,
          weekly_repetitions_goal: data.weekly_repetitions_goal
        });
        if(data.goal_type !== "Simple"){
          setWeeklyRepetitionsShowing(true);
        }
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = data => {
    setSubmitButtonIsActive(false);
    setSubmitButton("Saving");
    const headers = {
      'Authorization': 'Bearer ' + activeUser
    };

    axios({
          method: form.method,
          url: form.url,
          data: data,
          headers: headers
        }).then(res => {
          if(res.data === 200 && res.status === 200){
            window.location.assign("/");
          }
    });
  };


  const showHideRepetitionsGoal = () => {
    if(getValues('goal_type') === "Custom repetitions"){
      setWeeklyRepetitionsShowing(true);
    }else{
      setWeeklyRepetitionsShowing(false);
    }
  }

  return (
    <section className="goal-form">
      <h1>{form.title}</h1>

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
          <input type="submit" disabled={!submitButtonIsActive} value={submitButton} />
        </div>
      </form>

    </section>
  );
}
