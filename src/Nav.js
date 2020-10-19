import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Link, NavLink} from 'react-router-dom';

export default function Nav() {

    return (

        <nav className="navbar navbar-expand navbar-light" style={{backgroundColor: ' #ffe6ff'}}>

        <Link className="navbar-brand font-weight-bold" to="/">Games App</Link>
        

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav w-100">
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/">Home <span className="sr-only">(current)</span></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/games">Games</NavLink>
                </li>
                <li className="nav-item mr-auto">
                    <NavLink className="nav-link" exact to="/todos">Todos</NavLink>
                </li>

            </ul>
        </div>
    </nav>
    )
}
