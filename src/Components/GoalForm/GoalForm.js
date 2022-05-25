import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import { GoalDelete } from "./GoalDelete";
import { FormInput } from "../Shared/FormInput";
import { GoalFormOptionField } from "./GoalFormOptionField";

export const GoalForm = () => {
  const {goalId} = useParams();
  const navigate = useNavigate();
  const { register, getValues, handleSubmit, reset } = useForm();
  const [submitButtonIsActive, setSubmitButtonIsActive] = useState(true);
  const [weeklyRepetitionsShowing, setWeeklyRepetitionsShowing] = useState(false);

  let form = {
    submit: "Submit"
  };

  if(typeof goalId !== 'undefined'){
    form.title = "Edit goal";
    form.type = "edit";
    form.method = "put";
    form.submit = "Update goal";
    form.url = "goal/" + goalId;
  }else{
    form.title = "New goal";
    form.type = "new";
    form.method = "post";
    form.submit = "Create goal";
    form.url = "goal";
  }

  const [submitButton, setSubmitButton] = useState(form.submit);

  useEffect(() => {

    if(form.type === "edit"){
      axios({
        method: 'get',
        url: form.url
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

    axios({
          method: form.method,
          url: form.url,
          data: data
        }).then(res => {
          if(res.data === 200 && res.status === 200){
            navigate('/');
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
  const goal_option_simple = {
    id: "goal_type__simple",
    title: "Simple",
    description: "A basic, do it once per day goal.",
    name: "goal_type",
    validation: { required: true }
  };
  const goal_option_custom = {
    id: "goal_type__custom",
    title: "Custom repetitions",
    description: "Set a custom amount of repetitions of this goal per week and add a custom amount to the weekly total every day.",
    name: "goal_type",
    validation: { required: true, onChange: showHideRepetitionsGoal }
  };

  return (
    <section className="goal-form">
      <h1>{form.title}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput register={register} id="title" label="Daily title" validation={{required: true, maxLength: 80}} />
        <FormInput register={register} id="title_weekly" label="Weekly title" validation={{required: true, maxLength: 80}} />


        <div className="field goal-type">
          <div className="field__label">Goal type</div>
            <GoalFormOptionField field={goal_option_simple} register={register} />
            <GoalFormOptionField field={goal_option_custom} register={register} />
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
      {form.type === "edit" && <GoalDelete goalId={goalId} />}
    </section>
  );
}
