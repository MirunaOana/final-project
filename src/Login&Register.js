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

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        retype_password: ''
    })
    
    const {pathname} = useLocation();
    
    const pathSignUp = (pathname === '/sign-up');

    useEffect(function() {

        if ( !pathSignUp ) {

            if (document.cookie !== '') {
                
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
        } 
    
    }, []);

    function inputChange(eInputChange) {

        if (eInputChange.target.name === 'username') {

            setinValues({...inValues, [eInputChange.target.name]: eInputChange.target.value.substring(0, 15)});

        } else {

            setinValues({...inValues, [eInputChange.target.name]: eInputChange.target.value});
        }

    }

    function checkForm() {

        document.querySelector('[data-sign-inputs="password"]').classList.add('d-none');

        let checker = true;

        const updateErrors = {...errors};

        if (pathSignUp && ( !inValues.username || inValues.username.length < 3 )) {

            updateErrors.username = 'Please provide a valid username !';

            checker = false;
            
        } else {

            updateErrors.username = '';

        }

        if (!inValues.email) {

            updateErrors.email = 'Please provide a valid email !';

            checker = false;

        } else {

            updateErrors.email = '';
        }

        if (!inValues.password) {

            updateErrors.password = 'Please provide a valid password !';

            checker = false;

        } else {

            
            updateErrors.password = '';
        }

        if (pathSignUp && !inValues.retype_password) {

            updateErrors.retype_password = 'Please retype the password !';

            checker = false;

        } else {

            if (pathSignUp && inValues.retype_password !== inValues.password) {


                updateErrors.retype_password = 'The passwords did not match !';

                checker = false;

            } else { 

                updateErrors.retype_password = '';
            }
            
        }

        setErrors(updateErrors);

        return checker;
    }

    function handleInSubmit(inE) {

        inE.preventDefault();

        if ( !checkForm()) {
            return;
        }

        if (!pathSignUp) {

            firebase.auth().signInWithEmailAndPassword(inValues.email, inValues.password).then(function(user) {
                if (user) {

                    const inCheckBox = document.querySelector('[data-log="checkbox"]');
                    const inUserName = document.querySelector('[data-log="email"]');

                    if (inCheckBox.checked) {

                        document.cookie = `email=${inUserName.value}; expires=10 November 2020 00:00:00`;

                    } else {

                        document.cookie = `email=${inUserName.value}; expires=10 November 2000 00:00:00`;

                    }

                    window.location.href = '/';

                }
            })
            .catch(function(error) {

                document.querySelector('[data-sign-inputs="password"]').innerText = error.message;
                document.querySelector('[data-sign-inputs="password"]').classList.remove('d-none');

            });

        } else {

            firebase.auth().createUserWithEmailAndPassword(inValues.email, inValues.password).then(function(response) {

                if (response) {

                    firebase.auth().currentUser.updateProfile({

                    displayName: inValues.username

                    }).catch(function(error) {

                        console.warn(error);

                    });

                    firebase.auth().currentUser.sendEmailVerification().then(function() {

                        window.location.href = '/';

                    })
                    .catch(function(error) {
                        console.warn(error);
                    });
                }
            })
            .catch(function(error) {

                document.querySelector('[data-sign-errors="up"]').classList.remove('d-block');
                document.querySelector('[data-sign-errors="up"]').innerHTML = error.message;

            });

        }
    }

    function exitResetModal() {

        document.querySelector('[data-modals="email-reset"]').value = '';
        document.querySelector('[data-modals="reset-password"]').classList.remove('d-block');
        document.querySelector('[data-modals="error-reset"]').classList.remove('d-block');
        document.querySelector('[data-modals="email-reset"]').classList.remove('is-invalid');

    }

    function resetPassword (eRP) {

        eRP.preventDefault();

        const emailForReset = document.querySelector('[data-modals="email-reset"]');
        const errorForReset = document.querySelector('[data-modals="error-reset"]');

        if (emailForReset.value === "") {

            emailForReset.classList.add('is-invalid');
            errorForReset.classList.add('d-block');
            
        } else {
            
            errorForReset.classList.remove('d-block');
            emailForReset.classList.remove('is-invalid');

            firebase.auth().sendPasswordResetEmail(emailForReset.value).then(function() {
                
                exitResetModal();

                document.querySelector('[data-alerts="reset-password"]').classList.add('d-block');

                setTimeout(function() {

                    document.querySelector('[data-alerts="reset-password"]').classList.remove('d-block');

                }, 10000)
                
            }).catch(function(error) {
            


            });
        }

    }
        

    return (

        <div>

            <div className="alert alert-success w-50 m-auto d-none" role="alert" data-alerts="reset-password">

                <div>

                    <div>

                        <button type="button" className="close ml-auto" data-dismiss="modal" aria-label="Close" 
                        onClick={function() {
                            
                            document.querySelector('[data-alerts="reset-password"]').classList.add('d-none');
                            
                        }}><span aria-hidden="true" style={{color: '#228B22'}} onClick={function() {document.querySelector('[data-alerts="reset-password"]').classList.remove('d-block');}}>&times;</span></button>

                    </div>
                    <h4 className="alert-heading" style={{color: '#228B22'}}>Reset passwordrequest sent successfully !</h4>

                </div>

            </div>

            <div className="modal bg-dark" style={{opacity: '0.85'}} tabIndex="-1" role="dialog" data-modals="reset-password">

                <div className="modal-dialog" role="document">

                    <div className="modal-content" style={{backgroundColor: '#fbeaeb'}}>

                        <div className="modal-header">

                            <h5 className="modal-title">Do you want to reset your password ?</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={exitResetModal}>
                            <span aria-hidden="true">&times;</span>
                            </button>

                        </div>

                        <form className="modal-body" onSubmit={resetPassword}>

                            <p>Please provide your email:</p>
                            <input type="email" className="form-control mb-1" data-modals="email-reset"/>
                            <div className="invalid-feedback font-weight-bold mb-2" data-modals="error-reset">Please fill the above input !</div>
                            <button type="submit" className="btn btn-dark" style={{width: '-webkit-fill-available'}}>Send reset password email</button>

                        </form>

                    </div>

                </div>

            </div>


            <form className="p-4 rounded border-bottom w-50" style={{backgroundColor: '#fbeaeb', height: 'fit-content', margin: '0 auto', marginTop: '150px'}} onSubmit={handleInSubmit}>


                <h2 className="text-center">{pathSignUp ? 'Sign up' : 'Sign in' }</h2>

                { pathSignUp && (

                    <div  className="form-group">

                    <label htmlFor="username" className="font-weight-bold">User name</label>
                    <input type="text" autoComplete="username" className={`form-control ${errors.username && 'is-invalid'}`} id="username" name="username" onChange={inputChange} value={inValues.username} data-log="username"/>
                    <div className="mt-2 text-muted font-italic" style={{fontSize: '12px'}}>Minimum 3 characters and maximum 15 characters</div>
                    <div className="invalid-feedback">{errors.username}</div>

                    </div>

                )}

                <div  className="form-group">

                    <label htmlFor="email" className="font-weight-bold">Email:</label>
                    <input type="email" autoComplete="email" className={`form-control ${errors.email && 'is-invalid'}`} id="email" name="email" onChange={inputChange} value={inValues.email} data-log="email"></input>
                    <div className="invalid-feedback">{errors.email}</div>

                </div>

                <div  className="form-group">

                    <label htmlFor="password" className="font-weight-bold">Password:</label>
                    <input type="password" autoComplete="current-password" className={`form-control ${errors.password && 'is-invalid'}`} id="password" name="password" onChange={inputChange} value={inValues.password}/>
                    <div className="text-danger d-none" data-sign-inputs="password"></div>
                    <div className="mt-2 text-muted font-italic" style={{fontSize: '12px'}}>Minimum 6 characters</div>

                    <div className="invalid-feedback mt-2">{errors.password}</div>

                </div>

                {pathSignUp ? (

                    <>

                        <div  className="form-group">

                            <label htmlFor="retype_password" className="font-weight-bold">Retype Password:</label>
                            <input type="password" autoComplete="current-password" className={`form-control ${errors.retype_password && 'is-invalid'}`} id="retype_password" name="retype_password" onChange={inputChange} value={inValues.retype_password}/>
                            <div className="mt-2 text-muted font-italic" style={{fontSize: '12px'}}>Minimum 6 characters</div>
                            <div className="invalid-feedback">{errors.retype_password}</div>

                        </div>

                        <div className="text-muted">You will be signed in automatically if the sing up is succsessfull !</div>

                        <div className="text-warning d-block" data-sign-errors="up"></div>

                        <button className="btn font-weight-bold w-100 text-nowrap mt-3" style={{backgroundColor: "white"}}>Sign up</button>

                    </>

                ) : (

                    <>
                    
                        <label className="font-weight-bold mr-5"><input type="checkbox" className="mr-2" data-log="checkbox"/>Remember email</label>
                        
                        <button className="btn font-weight-bold w-100 text-nowrap" style={{backgroundColor: "white"}}>Sign in</button>
                        
                        <div className="mt-2 d-flex">

                            <div className="float-left">

                                <span>You don't have an account?</span>
                                <Link 
                                    className="navbar-brand ml-2 font-weight-bold"
                                    style={{fontSize: '1rem', color: '#007bff'}} 
                                    to="/sign-up"
                                    onMouseLeave={function() {document.querySelector('[data-sign-up]').style.color = '#007bff'}}
                                    onMouseEnter={function() {document.querySelector('[data-sign-up]').style.color = '#bfbfbf'}} 
                                    data-sign-up>
                                    Sing Up
                                </Link>

                            </div>

                            <div className="ml-auto mt-1">

                                <span 
                    
                                    onMouseLeave={function() {document.querySelector('[data-buttons="reset-password"]').style.color = '#007bff'}}
                                    onMouseEnter={function() {document.querySelector('[data-buttons="reset-password"]').style.color = '#bfbfbf'}} 
                                    className="btn font-weight-bold p-0 border-0" 
                                    style={{backgroundColor: '#fbeaeb !important', color: '#007bff'}} 
                                    onClick={function() {document.querySelector('[data-modals="reset-password"]').classList.add('d-block')}}
                                    data-buttons="reset-password">
                                    Forgot your password ?

                                </span>

                            </div>

                        </div>

                    </>

                )}
            </form>

        </div>
    )
}
