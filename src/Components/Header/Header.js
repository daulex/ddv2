import React, {useContext} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import logo from '../../dailyDo.svg';
import {Icon} from "../IcoMoon/Icon";
import { Context } from "../Auth/UserContext";
import FloatingMenu from "./FloatingMenu";
import { PullToRefresh } from './PullToRefresh';

const Header = () => {
    const navigate = useNavigate();
    const links = [
        {
            to: "/my-account",
            label: "My account"
        },
        {
            to: "/history",
            label: "History"
        }
    ];
    const [activeUser, setActiveUser] = useContext(Context);
    const logOut = () => {
        localStorage.removeItem('token');
        setActiveUser(false);
        window.history.pushState('dailyDo', '','/');
        window.location.reload();
    }
    const handleNewGoalClick = () => {
        navigate('/new-goal', {state: {goal: null}});
    }
    
    return (
        <header className="main">
            <PullToRefresh />
            <NavLink to="/"><img src={logo} className="logo" alt="dailyDo logo" /></NavLink>
            {activeUser &&
            <nav>
                <button onClick={handleNewGoalClick} className="new-goal">
                    <Icon size="20px" icon='plus-square' />
                </button>
                <FloatingMenu links={links} logOut={logOut} />
            </nav>
            }
        </header>
    );

}
export default Header;