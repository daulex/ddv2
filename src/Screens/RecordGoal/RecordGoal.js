import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FormInput } from "../../Components/Shared/FormInput";

const RecordGoal = () => {
  const navigate = useNavigate();
  const {recordId} = useParams();
  const { register, handleSubmit } = useForm();
  const [title, setTitle] = useState("Loading...");
  const [submitButtonIsActive, setSubmitButtonIsActive] = useState(true);

  const {state} = useLocation();
  const goal = state !== null ? state.goal : null;

  let form = {
    submit: "Save",
    getUrl: "goal/" + recordId,
    submitUrl:  "goal/record/" + recordId
  };
  const [submitButton, setSubmitButton] = useState(form.submit);

  useEffect(() => {
    if(goal !== null){
      setTitle(goal.title);
    }else{
      axios({
        method: 'get',
        url: form.getUrl
      }).then(res => {
        const data = JSON.parse(res.data);
        setTitle(data.title);
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = data => {
    setSubmitButtonIsActive(false);
    setSubmitButton("Saving");

    axios({
      method: 'post',
      url: form.submitUrl,
      data: data
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <section className="record-goal">
      <h1>Record goal</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="record-goal__title-row">
          <span className="label">Add repetitions to goal</span>
          <span className="title">{title}</span>
        </div>
        <FormInput register={register} id="amount" label="Amount to add" validation={{required: true, maxLength: 80}} />

        <div className="form-footer">
          <input type="submit" disabled={!submitButtonIsActive} value={submitButton} />
        </div>
      </form>
    </section>
  );
}
export default RecordGoal;