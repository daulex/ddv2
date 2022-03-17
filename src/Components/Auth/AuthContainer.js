import React, {useState, useContext} from 'react';
import AuthMenu from './AuthMenu';
import AuthForm from './AuthForm';
import { payloadMaker } from "../../utilities";
import {Context} from "./UserContext";
import axios from "axios";

const AuthContainer = ({action}) => {

    const [activeUser, setActiveUser] = useContext(Context);
    if(activeUser){
        window.location = "/";
    }
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
        }
    }

    const setCurrentAction = (action) => {
            setSuccessMessage(false);
            setProcessing(false);
    }

    const processAuth = (data, forceAction = "none") => {
        setProcessing(true);

        if(action === "login" || forceAction === "login"){

            axios.post('wp-json/jwt-auth/v1/token', data)
              .then(function (response) {
                if(typeof response.data !== undefined && typeof response.data.token !== undefined){
                    localStorage.setItem('token', response.data.token);
                    setActiveUser(response.data.token);
                    setTimeout(function(){
                        window.location.assign("/");
                    }, 100);
                }
              })
              .catch(function (error) {
                console.log(error);
              });


        }else if(action === "recover"){

            const url = process.env.REACT_APP_DDAPI + 'reset-password/' + data.username;

            fetch(url)
                .then(res => res.json())
                .then(() => {
                    // console.log("req sent");
                });

            setSuccessMessage("Password reset link will be sent shortly.");

        // }else if(action === "verify"){
        //
        //     const url = process.env.REACT_APP_DDAPI + 'verify-email/';
        //     const body = {
        //         key: data[0],
        //     };
        //
        //     fetch(url, payloadMaker(body) )
        //         .then(res => res.json())
        //         .then(response => {
        //
        //             if (parseInt(response)) {
        //                 setSuccessMessage("Email verified... Redirecting.");
        //                 setTimeout(function(){window.location = "/";}, 300);
        //             } else {
        //                 setErrors(['Something went wrong, please try again']);
        //                 setProcessing(false);
        //             }
        //         });



        }else if(action === "reset") {

            const authUrl = process.env.REACT_APP_DDAPI + 'reset-password/';
            const body = {
                username: data.reset_email,
                key: data.key,
                password: data.password,
            };

            fetch(authUrl, payloadMaker(body) )
                .then(res => res.json())
                .then(response => {
                    if (parseInt(response)) {
                        processAuth([data.reset_email, data.password], "login");
                    } else {
                        setProcessing(false);
                    }
                });
        }else if(action === "register"){
            const regUrl = process.env.REACT_APP_DDAPI + 'register/';

            fetch(regUrl, payloadMaker(data) )
                .then(res => res.json())
                .then(response => {
                    if (parseInt(response)) {
                        processAuth([data.username, data.password], "login");
                    } else {
                        setProcessing(false);
                    }
                });
        }
    }


    const submitLabel = actions[action].buttonLabel;

    return(
        <div className="auth-wrap">
            {!['reset','verify'].includes(action)  &&
            <AuthMenu setCurrentAction={setCurrentAction} action={action} actions={actions} />
            }
            {successMessage ? <div className="alert alert-primary my-3">{successMessage}</div> :
            <AuthForm processAuth={processAuth} action={action} actions={actions} submitLabel={submitLabel} processing={processing} />
            }
        </div>
    );
}
export default AuthContainer;