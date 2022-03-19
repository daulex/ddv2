import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
    const [emailIsVerified, setEmailIsVerified] = useState(false);
    const [message, setMessage] = useState("Verifying...");
    const {key} = useParams();

    useEffect(() => {
        const url = process.env.REACT_APP_DDAPI + 'verify-email/';
        axios.post(url, {key: key})
            .then(response => {
                if(parseInt(response.data)){
                    setMessage("Great, your email is now verified, you may now log in...");
                }else{
                    setMessage("Something went wrong... Maybe it's already verified?");
                }

                setEmailIsVerified(true);
            })
            .catch(() => {
                setMessage("Something went wrong... Maybe it's already verified?");
            });
    }, [key]);

    return(
        <div className="verify-screen">
            <h1>Email verification</h1>
            <div className="verify-screen__message">
                <p>{message}</p>
                {emailIsVerified &&
                    <a className="button" href="/">Log in</a>
                }
            </div>
        </div>
    );
}

export default VerifyEmail;