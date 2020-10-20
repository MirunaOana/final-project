import React, { useContext } from 'react';
import {Link, NavLink} from 'react-router-dom';
import { authContext } from './AuthContext';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default function Nav() {

    const {isSignedIn, user} = useContext(authContext);

    function handleOut(eOut) {

        eOut.preventDefault();

        firebase.auth().signOut().catch(function(errorOut) {
            console.warn(errorOut);
        });

        window.location.href = '/';

    }

    return (

        <nav className="navbar fixed-top navbar-expand navbar-light font-weight-bold text-nowrap border-bottom" style={{backgroundColor: '#fbeaeb'}}>

        <Link className="navbar-brand font-weight-bold" to="/" style={{fontSize: '25px'}}>

            Bunny Care
            <img src={require('./nav-bunny.png')} alt="" className="mb-2" style={{width: '50px', height: '40px'}}></img>

        </Link>
        

        <div className="collapse navbar-collapse" style={{fontSize: '18px'}}>

            <ul className="navbar-nav w-100">

                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/games">Games</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/todos">Todos</NavLink>
                </li>

                {isSignedIn ? (

                    <>

                    <li className="nav-item ml-auto">
                        <a className="nav-link" href="/" onClick={handleOut}>Sign out</a>
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
