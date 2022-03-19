import React from 'react';
import { useForm } from "react-hook-form";
import {findGetParameter} from "../../utilities";

const resetEmail = findGetParameter('em');
const resetToken = findGetParameter('to');

const AuthForm = ({action, actions, processAuth}) => {
    const formOptions = {};
    if(resetEmail && resetToken && action === 'reset'){
        formOptions.defaultValues = {
            username: resetEmail,
            key: resetToken
        }
    }
    const { register, handleSubmit  } = useForm(formOptions);
    const onSubmit = data => {
        processAuth(data);
    };
    const inputData = {
        email: {
            name: "username",
            type: "email",
            label: "Email",
            placeholder: "name@example.com",
            validation: {required: true, pattern: /^\S+@\S+$/i}
        },
        reset_email: {
            name: "username",
            type: "text",
            label: "Reset email",
            disabled: "disabled",
            validation: {required: true, pattern: /^\S+@\S+$/i}
        },
        reset_token: {
            name: "key",
            type: "text",
            label: "Key",
            disabled: "disabled",
            validation: {}
        },
        password: {
            name: "password",
            type: "password",
            label: "Password",
            placeholder: "Password",
            validation: {required: true, min: 6}
        },
        password_confirm: {
            name: "password_confirm",
            type: "password",
            label: "Confirm password",
            placeholder: "Confirm password",
            validation: {required: true, min: 6}
        }
    }
    const inputsToRender = actions[action].inputs;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <fieldset className={'fields-'+action}>
            {inputsToRender.map((fieldRef, i) => (
                <div className={'field-type-' + inputData[fieldRef].type} id={inputData[fieldRef].name} key={"field-"+i}>
                    <label htmlFor={inputData[fieldRef].name}>{inputData[fieldRef].label}</label>
                    <input
                        type={inputData[fieldRef].type}
                        placeholder={inputData[fieldRef].placeholder}
                        name={inputData[fieldRef].name}
                        disabled={inputData[fieldRef].disabled}
                        {...register(inputData[fieldRef].name, inputData[fieldRef].validation)}
                        />
                </div>
            ))}
            </fieldset>

            <input type="submit" value={actions[action].buttonLabel} />
        </form>
    );
}
export default AuthForm;