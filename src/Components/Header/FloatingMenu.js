import {Icon} from "../IcoMoon/Icon";
import React from "react";
import {NavLink} from "react-router-dom";
import { useDropdown } from "../../Hooks/useDropdown";

const FloatingMenu = ({links, logOut}) => {
    const [dropdownRef, isOpen, setIsOpen] = useDropdown();
    const handleMenuClick = () => {
        setIsOpen(false);
    }
    
    return(
        <div className="container--floating-menu" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="icon-button button--menu-open">
                <Icon color='#000' size="20px" icon='menu' />
            </button>
            {isOpen &&
            <div className="floating-menu">
                <button onClick={handleMenuClick} className="icon-button menu-toggle"><Icon color='#fff' size="20px" icon='menu' /></button>
                <ul>
                    {links.map((link, key) => {
                        return <li key={key} onClick={handleMenuClick}><NavLink to={link.to}>{link.label}</NavLink></li>
                    })}
                </ul>
                <button onClick={logOut} className="log-out">Log out</button>
            </div>
            }
        </div>
    );
}
export default FloatingMenu;