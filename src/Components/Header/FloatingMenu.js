import {Icon} from "../IcoMoon/Icon";
import React from "react";
import {NavLink} from "react-router-dom";

const FloatingMenu = ({links, logOut, setFloatingMenuShowing}) => {
    const handleMenuClick = () => {
        setFloatingMenuShowing(false);
    }
    return(
        <div className="floating-menu">
            <button onClick={handleMenuClick} className="icon-button menu-toggle"><Icon color='#fff' size="20px" icon='menu' /></button>
            <ul>
                {links.map((link, key) => {
                    return <li key={key}><NavLink to={link.to}>{link.label}</NavLink></li>
                })}
            </ul>
            <button onClick={logOut} className="log-out">Log out</button>
        </div>
    );
}
export default FloatingMenu;