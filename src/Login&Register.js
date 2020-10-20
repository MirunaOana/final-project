import React, {useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default function LoginRegister() {

    const [inValues, setinValues] = useState({
        username: '',
        email: '',
        password: '',
        retype_password: ''
    });

    const {pathname} = useLocation();

    const pathSignUp = (pathname === '/sign-up');

    function handleIn() {

        const inCheckBox = document.querySelector('[data-log="checkbox"]');
        const inUserName = document.querySelector('[data-log="email"]');

        if (inCheckBox.checked) {

            document.cookie = `email=${inUserName.value}; expires=10 November 2020 00:00:00`;

        } else {

            document.cookie = `email=${inUserName.value}; expires=10 November 2000 00:00:00`;

        }

    }

    function inputChange(eInputChange) {
        setinValues({...inValues, [eInputChange.target.name]: eInputChange.target.value});
        console.log(inValues);
    }

    
    useEffect(function() {

        if (document.cookie !== '' && !pathSignUp) {
            
            let usernameCookies = document.cookie.split(';');
            const usernameCookiesIndex = usernameCookies.findIndex(function(ucEl) {
                return ucEl.includes('email');
            }) 
            
            if (usernameCookiesIndex === -1) {

                return;

            } else {

                document.querySelector('[data-log="checkbox"]').checked = true;
                document.querySelector('[data-log="email"]').value = usernameCookies[usernameCookiesIndex].split('=')[1];

                inValues.email = usernameCookies[usernameCookiesIndex].split('=')[1];
            }
        }
         
    }, []);

    function handleInSubmit(inE) {

        inE.preventDefault();

        if (!pathSignUp) {

            firebase.auth().signInWithEmailAndPassword(inValues.email, inValues.password).then(function(user) {
                if (user) {

                    window.location.href = '/';

                }
            })
            .catch(function(error) {

                console.warn(error);

            });

        } else {

            firebase.auth().createUserWithEmailAndPassword(inValues.email, inValues.password).then(function(response) {

                if (response) {

                    window.location.href = '/';
                }
            })
            .catch(function(error) {

                console.warn(error);

            });

        }
    }
        

    return (

        <form className="p-4 rounded m-auto border-bottom w-50" style={{backgroundColor: '#fbeaeb', height: 'fit-content'}} onSubmit={handleInSubmit}>

            <h2 className="text-center">{pathSignUp ? 'Sign up' : 'Sign in' }</h2>

            { pathSignUp && (

                <div  className="form-group">

                <label htmlFor="username" className="font-weight-bold">User name</label>
                <input type="text" autoComplete="username" className="form-control is-invalid" id="username" name="username" onChange={inputChange} value={inValues.username} data-log="username"></input>
                <div className="invalid-feedback">Please enter a valid user name</div>

                </div>

            )}

            <div  className="form-group">

                <label htmlFor="email" className="font-weight-bold">Email:</label>
                <input type="email" autoComplete="email" className="form-control is-invalid" id="email" name="email" onChange={inputChange} value={inValues.email} data-log="email"></input>
                <div className="invalid-feedback">Please enter a valid email</div>

            </div>

            <div  className="form-group">

                <label htmlFor="password" className="font-weight-bold">Password:</label>
                <input type="password" autoComplete="current-password" className="form-control is-invalid" id="password" name="password" onChange={inputChange} value={inValues.password}></input>
                <div className="d-flex">

                    <div className="invalid-feedback">Please enter a valid password</div>
                    <div className="font-italic mt-2 ml-auto text-muted" style={{fontSize: '12px'}}>Minimum 6 characters</div>

                </div>

            </div>

            {pathSignUp ? (

                <>

                <div  className="form-group">

                    <label htmlFor="retype_password" className="font-weight-bold">Retype Password:</label>
                    <input type="password" autoComplete="current-password" className="form-control is-invalid" id="retype_password" name="retype_password" onChange={inputChange} value={inValues.retype_password}></input>

                <div className="d-flex">

                    <div className="invalid-feedback">Please enter a valid password</div>
                    <div className="font-italic mt-2 ml-auto text-muted" style={{fontSize: '12px'}}>Minimum 6 characters</div>

                </div>

                </div>

                <button className="btn font-weight-bold w-100 text-nowrap" style={{backgroundColor: "white"}}>Sign up</button>
                </>

            ) : (

                <>
            
                <label className="font-weight-bold mr-5"><input type="checkbox" className="mr-2" data-log="checkbox"></input>Remember email</label>
                <button className="btn font-weight-bold w-100 text-nowrap" style={{backgroundColor: "white"}} onClick={handleIn}>Sign in</button>
                
                <div className="mt-2">

                    You don't have an account?
                    <Link className="navbar-brand ml-2 font-weight-bold" style={{fontSize: '1rem', color: '#bfbfbf'}} to="/sign-up">Sing Up</Link>

                </div>

                </>

            )}
        </form>
    )
}
