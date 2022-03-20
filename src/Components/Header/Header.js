import React, {useContext, useState} from 'react';
import {NavLink} from "react-router-dom";
import logo from '../../dailyDo.svg';
import {Icon} from "../IcoMoon/Icon";
import { Context } from "../Auth/UserContext";
import FloatingMenu from "./FloatingMenu";


export const Header = () => {
    const links = [
        {
            to: "/my-account",
            label: "My account"
        },
        // {
        //     to: "/tips",
        //     label: "Tips"
        // }
    ];
    const [floatingMenuShowing, setFloatingMenuShowing] = useState(false);
    const [activeUser, setActiveUser] = useContext(Context);
    const logOut = () => {
        localStorage.removeItem('token');
        setActiveUser(false);
        window.history.pushState('dailyDo', '','/');
        window.location.reload();
    }
    const handleMenuClick = () => {
        setFloatingMenuShowing(true);
    }

    return (
        <header className="main">
            <NavLink to="/"><img src={logo} className="logo" alt="dailyDo logo" /></NavLink>
            {activeUser &&
            <nav>
                <NavLink to="/new-goal" key="new-goal"><Icon color='#000' size="20px" icon='plus-square' /></NavLink>
                <button onClick={handleMenuClick} className="icon-button"><Icon color='#000' size="20px" icon='menu' /></button>
                {floatingMenuShowing && <FloatingMenu links={links} logOut={logOut} setFloatingMenuShowing={setFloatingMenuShowing}/>}
            </nav>
            }
        </header>
    );

}
