import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Link, NavLink} from 'react-router-dom';

export default function Nav() {

    return (

        <nav className="navbar fixed-top navbar-expand navbar-light font-weight-bold text-nowrap" style={{backgroundColor: '#fbeaeb'}}>

        <Link className="navbar-brand font-weight-bold" to="/">

            Bunny Care
            <img src={require('./nav-bunny.png')} alt="" className="mb-2" style={{width: '50px', height: '40px'}}></img>

        </Link>
        

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav w-100">

                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/games">Games</NavLink>
                </li>
                <li className="nav-item mr-auto">
                    <NavLink className="nav-link" exact to="/todos">Todos</NavLink>
                </li>
                <li className="nav-item ml-auto">
                    <NavLink className="nav-link" exact to="/sign-in">Sign in</NavLink>
                </li>

            </ul>

        </div>
    </nav>
    )
}
