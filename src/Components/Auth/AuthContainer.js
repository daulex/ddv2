import React, {useState, useContext} from 'react';
import AuthMenu from './AuthMenu';
import { AuthForm } from './AuthForm';
import { payloadMaker } from "../../utilities";
import {Context} from "./UserContext";

const AuthContainer = (props) => {

    const [activeUser, setActiveUser] = useContext(Context);
    if(activeUser){
        window.location = "/";
    }
    const [action, setAction] = useState(props.action ?? "login" );
    const [errors, setErrors] = useState([] );
    const [successMessage, setSuccessMessage] = useState(false );
    const [processing, setProcessing] = useState(false );


    const actions = {
        login: {
            name: "login",
            title: "Log in",
            buttonLabel: "Log in",
            inputs: ["email", "password"]
        },
        register: {
            name: "register",
            title: "Register",
            buttonLabel: "Register",
            inputs: ["email", "password", "password_confirm"]
        },
        recover: {
            name: "recover",
            title: "Recover",
            buttonLabel: "Request reset link",
            inputs: ["email"]
        },
        reset: {
            name: "reset",
            title: "Reset",
            buttonLabel: "Reset password",
            inputs: ["reset_email", "reset_token", "password", "password_confirm"]
        },
        verify: {
            name: "verify",
            title: "Verify",
            buttonLabel: "Verify email",
            inputs: ["verify_email"]
        }
    }

    const inputs = {
        email: {
            name: "email",
            type: "email",
            label: "Email",
            placeholder: "name@example.com"
        },
        reset_email: {
            name: "reset_email",
            type: "text",
            label: "Reset email",
            disabled: "disabled"
        },
        verify_email: {
            name: "verify_email",
            type: "text",
            label: "Verify email",
            disabled: "disabled"
        },
        reset_token: {
            name: "key",
            type: "key",
            label: "Key",
            disabled: "disabled"
        },
        password: {
            name: "password",
            type: "password",
            label: "Password",
            placeholder: "Password"
        },
        password_confirm: {
            name: "password_confirm",
            type: "password",
            label: "Confirm password",
            placeholder: "Confirm password"
        }
    }




    const setCurrentAction = (action) => {
            setAction(action);
            setSuccessMessage(false);
            setProcessing(false);
    }

    const processAuth = (data, forceAction = "none") => {
        setProcessing(true);

        if(action === "login" || forceAction === "login"){

            const authUrl = process.env.REACT_APP_DDAPI_DOMAIN + 'wp-json/jwt-auth/v1/token';
            const body = {
                username: data[0],
                password: data[1]
            };

            fetch(authUrl, payloadMaker(body) )
                .then(res => res.json())
                .then(response => {
                    if(typeof response.token !== 'undefined'){
                        localStorage.setItem('token', response.token);
                        setActiveUser(response.token);
                        window.history.pushState('dailyDo', '','/');
                    }else{
                        setErrors(['Something went wrong, please try again']);
                        setProcessing(false);
                    }
                });

        }else if(action === "recover"){

            const url = process.env.REACT_APP_DDAPI + 'reset-password/' + data[0];

            fetch(url)
                .then(res => res.json())
                .then(() => {
                    // console.log("req sent");
                });

            setSuccessMessage("Password reset link will be sent shortly.");

        }else if(action === "verify"){

            const url = process.env.REACT_APP_DDAPI + 'verify-email/';
            const body = {
                key: data[0],
            };

            fetch(url, payloadMaker(body) )
                .then(res => res.json())
                .then(response => {

                    if (parseInt(response)) {
                        setSuccessMessage("Email verified... Redirecting.");
                        setTimeout(function(){window.location = "/";}, 300);
                    } else {
                        setErrors(['Something went wrong, please try again']);
                        setProcessing(false);
                    }
                });



        }else if(action === "reset") {

            const authUrl = process.env.REACT_APP_DDAPI + 'reset-password/';
            const body = {
                username: data[0],
                key: data[1],
                password: data[2],
            };

            fetch(authUrl, payloadMaker(body) )
                .then(res => res.json())
                .then(response => {
                    if (parseInt(response)) {
                        processAuth([data[0], data[2]], "login");
                    } else {
                        setErrors(['Something went wrong, please try again']);
                        setProcessing(false);
                    }
                });
        }else if(action === "register"){
            const regUrl = process.env.REACT_APP_DDAPI + 'register/';
            const body = {
                username: data[0],
                password: data[1],
            };

            fetch(regUrl, payloadMaker(body) )
                .then(res => res.json())
                .then(response => {
                    if (parseInt(response)) {
                        processAuth([data[0], data[1]], "login");
                    } else {
                        setErrors(['Something went wrong, please try again']);
                        setProcessing(false);
                    }
                });
        }
    }


    const submitLabel = actions[action].buttonLabel;
    const inputList = actions[action].inputs;

    return(
        <div className="auth-wrap">
            {!['reset','verify'].includes(action)  &&
            <AuthMenu setCurrentAction={setCurrentAction} action={action} actions={actions} />
            }
            {successMessage ? <div className="alert alert-primary my-3">{successMessage}</div> :
            <AuthForm errors={errors} processAuth={processAuth} action={action} inputs={inputs} inputList={inputList} submitLabel={submitLabel} processing={processing} />
            }
        </div>
    );
}
export default AuthContainer;