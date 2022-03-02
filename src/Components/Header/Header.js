import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import logo from '../../dailyDo.svg';
import {Icon} from "../IcoMoon/Icon";
import { Context } from "../Auth/UserContext";
// import {useState} from "react";

export const Header = () => {

    const [activeUser, setActiveUser] = useContext(Context);
    const logOut = () => {
        localStorage.removeItem('token');
        setActiveUser(false);
    }

    return (
        <header className="main">
            <NavLink to="/"><img src={logo} className="logo" alt="dailyDo logo" /></NavLink>
            <nav>
                <NavLink to="/new-goal" key="new-goal"><Icon color='#000' size="20px" icon='plus-square' /></NavLink>
                <button onClick={logOut} className="icon-button"><Icon color='#000' size="20px" icon='menu' /></button>
            </nav>
        </header>
    );

}
