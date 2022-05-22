import React from 'react';
import { useForm } from "react-hook-form";
import {findGetParameter} from "../../utilities";
import { AuthFormInput } from './AuthFormInput';

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
    
    const { register, handleSubmit, watch, formState: { errors }  } = useForm(formOptions);
    
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
            validation: {
                required: {
                    value: true,
                    message: "Password is required"
                },
                minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                }
            }
        },
        password_confirm: {
            name: "password_confirm",
            type: "password",
            label: "Confirm password",
            placeholder: "Confirm password",
            validation: {validate: value =>
                value === watch('password') || "The passwords do not match"}
        }
    }
    const inputsToRender = actions[action].inputs;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <fieldset className={'fields-'+action}>
            {inputsToRender.map((fieldRef, i) => (
                <AuthFormInput 
                    name={inputData[fieldRef].name} 
                    field={inputData[fieldRef]}
                    register={register}
                    key={"field-"+i}
                    error={errors[fieldRef]}
                    />
            ))}
            </fieldset>

            <input type="submit" value={actions[action].buttonLabel} />
        </form>
    );
}
export default AuthForm;