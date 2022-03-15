import { NavLink } from "react-router-dom";

const AuthMenu = ({actions, action}) => {

    const menuItems = actions;
    delete menuItems.reset;
    delete menuItems.verify;

    return(

        <nav>
            {Object.keys(menuItems).map((key) => (
                <NavLink key={key} to={"/user/" + actions[key].name} className={({ isActive }) => {
                    return isActive || (action === 'login' && actions[key].name === 'login') ? "active" : "";
                }}>{actions[key].title}</NavLink>
            ))}
        </nav>

    );

}
export default AuthMenu;