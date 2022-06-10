import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams} from "react-router-dom";
import { GoalDelete } from "./GoalDelete";
import { FormInput } from "../../Components/Shared/FormInput";
import { GoalFormOptionField } from "./GoalFormOptionField";
import {Icon} from "../../Components/IcoMoon/Icon";
import GoalFormHistory from "./GoalFormHistory/GoalFormHistory";

const GoalForm = () => {
  const {goalId} = useParams();

  const navigate = useNavigate();
  const { register, getValues, handleSubmit, reset } = useForm();
  const [submitButtonIsActive, setSubmitButtonIsActive] = useState(true);
  const [weeklyRepetitionsShowing, setWeeklyRepetitionsShowing] = useState(false);
  const [helpMessagesShowing, setHelpMessagesShowing] = useState(false);

  const {state} = useLocation();
  let goal = state !== null ? state.goal : null;

  const resetFormData = (data) => {
    reset({
      title: data.title,
      title_weekly: data.title_weekly,
      goal_type: data.goal_type,
      weekly_repetitions_goal: data.weekly_repetitions_goal
    });
    if(data.goal_type !== "Simple"){
      setWeeklyRepetitionsShowing(true);
    }
  }
  
  let form = {
    submit: "Submit"
  };

  if(typeof goalId !== 'undefined'){
    form.title = "Edit goal";
    form.type = "edit";
    form.method = "put";
    form.submit = "Save";
    form.url = "goal/" + goalId;

    if(goal !== null && getValues('title') === null){
      resetFormData(goal);
    }
  }else{
    form.title = "New goal";
    form.type = "new";
    form.method = "post";
    form.submit = "Create goal";
    form.url = "goal";
    if(getValues('title')){
      reset({
        title: null,
        title_weekly: null,
        goal_type: "Simple",
        weekly_repetitions_goal: null
      });
      setWeeklyRepetitionsShowing(false);
    }
  }

  const [submitButton, setSubmitButton] = useState(form.submit);
  
  useEffect(() => {
    if(form.type === "edit"){
      if(goal !== null){
        resetFormData(goal);
      }else{
        axios({
          method: 'get',
          url: form.url
        }).then(res => resetFormData(JSON.parse(res.data)) );
      }
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

  let goalFormClass = "goal-form";
  if(helpMessagesShowing)
    goalFormClass = "goal-form goal-form--help-messages-showing";
  

  return (
    <section className={goalFormClass}>
      <h1>
        {form.title}
        <button onClick={() => setHelpMessagesShowing(!helpMessagesShowing)} title="Toggle help messages">
          <Icon color={helpMessagesShowing ? '#f00' : '#ccc'} size="20px" icon='life-buoy' />
        </button>
      </h1>

      {form.type === "edit" && <GoalFormHistory id={goal.ID} />}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <FormInput register={register} id="title" label="Daily title" validation={{required: true, maxLength: 80}} />
        <FormInput register={register} id="title_weekly" label="Weekly title" validation={{required: true, maxLength: 80}} />


        <div className="field goal-type">
          <div className="field__label">Goal type</div>
            <GoalFormOptionField field={goal_option_simple} register={register} />
            <GoalFormOptionField field={goal_option_custom} register={register} />
        </div>

        {weeklyRepetitionsShowing &&
          <FormInput register={register} 
            id="weekly_repetitions_goal" 
            label="Weekly repetitions goal" 
            validation={{required: true, maxLength: 12}}
            type="number"
            />
        }

        <div className="form-footer">
          <input type="submit" disabled={!submitButtonIsActive} value={submitButton} />
        </div>
      </form>
      {form.type === "edit" && <GoalDelete goalId={goalId} />}
    </section>
  );
}
export default GoalForm;