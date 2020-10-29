import React, { useContext } from 'react';
import {Link, NavLink} from 'react-router-dom';
import { authContext } from './AuthContext';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { useState } from 'react';

export default function Nav() {

    const [collapsed, setCollapsed] = useState(undefined);

    const {isSignedIn, displayName} = useContext(authContext);

    function exitCollapse() {

        document.querySelector('[data-to-be-disabled]').disabled = false;
        setCollapsed(undefined);
    }

    function collapseName() {

        document.querySelector('[data-to-be-disabled]').disabled = true;

        setCollapsed(1);
    }

    function handleOut(eOut) {

        eOut.preventDefault();

        firebase.auth().signOut().catch(function(errorOut) {
            console.warn(errorOut);
        });

        window.location.href = '/';

    }

    return (

        <nav className="navbar fixed-top navbar-expand navbar-light font-weight-bold text-nowrap border-bottom" style={{backgroundColor: '#fbeaeb', }}>

        <Link className="navbar-brand font-weight-bold pt-0" to="/" style={{fontSize: '25px'}}>

            Bunny Care
            <img src={require('./nav-bunny.png')} alt="" className="mb-2" style={{width: '50px', height: '40px'}}></img>

        </Link>
        

        <div className="collapse navbar-collapse" style={{fontSize: '18px'}}>

            <ul className="navbar-nav w-100">

                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/adopt">Adopt</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/rehome">Rehome</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/contact">Contact</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/about">About</NavLink>
                </li>

                {isSignedIn ? (

                    <>

                    <li className={`nav-item ml-auto ${collapsed && 'fixed-top bg-dark'} postion-relative`}>

                        <div className="d-flex">

                            <button className={`nav-link btn font-weight-bold ${collapsed && 'text-white'}`} onClick={collapseName} style={{fontSize: '18px'}} data-to-be-disabled>{displayName}</button>

                            <button className={`font-weight-bold ${collapsed ? 'd-inline' : 'd-none'} text-white border-0 ml-auto`} style={{backgroundColor: '#343a40'}} onClick={exitCollapse}>&#10006;</button>

                        </div>

                        <div className="mt-3" style={collapsed && {height: '40px'}}>

                            <NavLink className={`nav-link ${collapsed ? 'd-inline' : 'd-none'} text-white mb-2 btn btn-dark`} exact to="/settings">Settings</NavLink>

                            <a className={`nav-link ${collapsed ? 'd-inline' : 'd-none'} text-white btn btn-dark`} href="/" onClick={handleOut}>Sign out</a>

                        </div>

                    </li>

                    </>

                ) : (

                    <>

                    <li className="nav-item ml-auto">
                        <NavLink className="nav-link" exact to="/sign-in">Sign in</NavLink>
                    </li>

                    </>
                )}

            </ul>

        </div>

    </nav>
    )
}