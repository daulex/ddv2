import React, {useContext, useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {Context} from "../Auth/UserContext";
import axios from "axios";

export const RecordGoal = () => {
  const {recordId} = useParams();
  const { register, handleSubmit } = useForm();
  const [activeUser] = useContext(Context);
  const [title, setTitle] = useState("Loading...");
  const [submitButtonIsActive, setSubmitButtonIsActive] = useState(true);

  let form = {
    headers: {'Authorization': 'Bearer ' + activeUser},
    submit: "Save",
    getUrl: process.env.REACT_APP_DDAPI + "goal/" + recordId,
    submitUrl:  process.env.REACT_APP_DDAPI + "goal/record/" + recordId
  };
  const [submitButton, setSubmitButton] = useState(form.submit);

  useEffect(() => {

    axios({
      method: 'get',
      url: form.getUrl,
      headers: form.headers
    }).then(res => {
      const data = JSON.parse(res.data);
      setTitle(data.title);
    });

  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = data => {
    setSubmitButtonIsActive(false);
    setSubmitButton("Saving");
    const headers = {
      'Authorization': 'Bearer ' + activeUser
    };

    axios({
      method: 'post',
      url: form.submitUrl,
      data: data,
      headers: headers
    }).then(res => {
      if(res.data === 200 && res.status === 200){
        window.location.assign("/");
      }
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
        <div className="field">
          <label className="field__label" htmlFor="amount">Amount to add</label>
          <input className="field__text" id="amount" type="number" placeholder="Amount to add" {...register("amount", {required: true, maxLength: 80})} />
        </div>



        <div className="form-footer">
          <input type="submit" disabled={!submitButtonIsActive} value={submitButton} />
        </div>
      </form>
    </section>
  );
}
