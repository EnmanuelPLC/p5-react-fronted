import { FunctionComponent, MouseEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";
import "./css/header.css";

interface HeaderProps {
    user: {
        user: string, 
        type: string
    },
    onSignOut: MouseEventHandler
}

const Header: FunctionComponent<HeaderProps> = ({user, onSignOut}) => {

    return (
        <div className="logo-wrapper">
			<div className="logo">
				<img className="feu"  alt="logo de la feu " src ="./img/Logo_FEU.jpg"></img>
				<Link to={'/'}>Secretaria de la FEU Facultad 2</Link>
			</div>
			
            {(user.user ? (
                <div className="nav-wrapper">
                    <span className="user">{user.user}</span>
                    <button onClick={onSignOut} className="btn btn-outline-danger logOut"><FaPowerOff/></button>
                </div>
            ) : (''))}
		</div>
    );
}

export default Header;