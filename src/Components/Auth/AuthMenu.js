import React from 'react';
import Nav from 'react-bootstrap/Nav';


export default function AuthMenu(props){

    const menuItems = props.actions;
    delete menuItems.reset;
    delete menuItems.verify;

    return(
        <Nav variant={"tabs"} defaultActiveKey={"action-" + props.action}>
            {Object.keys(menuItems).map((key) => (
            <Nav.Item key={"menu-" + props.actions[key].name}>
                <Nav.Link eventKey={"action-" + props.actions[key].name}
                          attr-action={props.actions[key].name}
                          href={"/user/" + props.actions[key].name}
                          title={props.actions[key].title}
                >{props.actions[key].title}</Nav.Link>
            </Nav.Item>
            ))}
        </Nav>
    );

}