import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export const RecordGoal = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
  const {recordId} = useParams();

  return (
    <section className="record-goal">
      <h1>Record goal</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="record-goal__title-row">
          <span className="label">Add repetitions to goal</span>
          <span className="title">[tbd] dummy</span>
        </div>
        <div className="field">
          <label className="field__label" htmlFor="amount">Amount to add</label>
          <input className="field__text" id="amount" type="number" placeholder="Amount to add" {...register("amount", {required: true, maxLength: 80})} />
        </div>



        <div className="form-footer">
          <input type="submit" value="Save" />
        </div>
      </form>
    </section>
  );
}
