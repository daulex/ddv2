import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteButton from "../Shared/DeleteButton/DeleteButton";

const MyAccount = ({setActiveUser}) => {
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const [submitButtonIsActive, setSubmitButtonIsActive] = useState(true);

  let form = {
    submit: "Update email",
    endpoint: "my-account",
  };
  const [submitButton, setSubmitButton] = useState(form.submit);


  useEffect(() => {
    axios({
      method: 'get',
      url: form.endpoint
    }).then(res => {
      reset({
        email: res.data
      });
    });
  }, [form.endpoint, reset]);

  const onSubmit = data => {
    setSubmitButtonIsActive(false);
    setSubmitButton("Saving");

    axios({
      method: 'put',
      url: form.endpoint,
      data: data
    }).then(() => {
      navigate('/');
    });
  };

  const runDelete = () => {
    axios({
      method: 'delete',
      url: "my-account"
    }).then(res => {
      if(res.data === 200){
        localStorage.removeItem('token');
        setActiveUser(false);
        navigate('/');
      }
    });
  }

  return (
    <section className="my-account">
      <h1>My Account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="field">
          <label className="field__label" htmlFor="email">My Email</label>
          <input className="field__text" id="email" type="email" placeholder="My email" {...register("email", {required: true, maxLength: 80})} />
        </div>

        <div className="form-footer">
          <input type="submit" disabled={!submitButtonIsActive} value={submitButton} />
        </div>
      </form>

      <DeleteButton runDelete={runDelete} label="Delete my account"/>
    </section>
  );
}

export default MyAccount;