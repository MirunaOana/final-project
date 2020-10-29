import React, { useContext, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { authContext } from './AuthContext';

export default function Settings() {

    const {emailVerified} = useContext(authContext);

    useEffect(function() {

        document.querySelector('[data-details-input="username"]').addEventListener('input', function (e) {
    
            e.target.value = e.target.value.substring(0, 15);
        })
    });

    function changeUserName(eUN) {

        eUN.preventDefault();

        const usernameInput = document.querySelector('[data-details-input="username"]');

        const changeUNerror = document.querySelector('[data-details-errors="username"]');

        if (/^[a-zA-Z0-9]*$/.test(usernameInput.value) && usernameInput.value !== "") {

            changeUNerror.classList.contains('d-block') && changeUNerror.classList.remove('d-block');

            usernameInput.classList.contains('is-invalid') && usernameInput.classList.remove('is-invalid');

            firebase.auth().currentUser.updateProfile({

                displayName: usernameInput.value,

            }).then(function() {

                window.location.reload(true);

            }).catch(function(error){
                
                console.warn(error);
                
            })

        } else {

            changeUNerror.classList.remove('text-success');
            changeUNerror.innerText = "User name is not valid !";
            changeUNerror.classList.add('d-block');
            usernameInput.classList.add('is-invalid');

        }
        
    }

    function changeEmail(eCE) {

        eCE.preventDefault();

        const oldEmail = document.querySelector('[data-details-input="old-email"]');
        const newEmail = document.querySelector('[data-details-input="new-email"]');

        const oldEmailErr = document.querySelector('[data-details-errors="old-email"]');
        const newEmailErr = document.querySelector('[data-details-errors="new-email"]');

        let changeEmailChecker = true;

        if (oldEmail.value !== firebase.auth().currentUser.email) {

            oldEmailErr.classList.add('d-block');
            oldEmail.classList.add('is-invalid');

            changeEmailChecker = false;

        } else {

            oldEmailErr.classList.remove('d-block');
            oldEmail.classList.remove('is-invalid');

        }

        if (newEmail.value === '') {

            newEmailErr.classList.add('d-block');
            newEmail.classList.add('is-invalid');

            changeEmailChecker = false;

        } else {

            newEmailErr.classList.remove('d-block');
            newEmail.classList.remove('is-invalid');

        }

        if (newEmail.value === oldEmail.value && newEmail.value !== '') {

            const equalEmErr = document.querySelector('[data-details-success="email"]');

            equalEmErr.classList.add('d-block');

            equalEmErr.innerText = "You can't change your email adress to the same email adress -_- ! ";
            
            equalEmErr.classList.remove("text-success");
            equalEmErr.classList.add("text-danger");

            changeEmailChecker = false;

        } else {

            const equalEmErr = document.querySelector('[data-details-success="email"]');

            equalEmErr.classList.remove('d-block');

            equalEmErr.innerText = "Email changed successfully !";
            
            equalEmErr.classList.add("text-success");
            equalEmErr.classList.remove("text-danger");

        }

        if (changeEmailChecker) {

            const equalEmErr = document.querySelector('[data-details-success="email"]');

            equalEmErr.classList.remove('d-block');

            equalEmErr.innerText = "Email changed successfully !";
            
            equalEmErr.classList.add("text-success");
            equalEmErr.classList.remove("text-danger");

            newEmailErr.classList.contains('d-block') && newEmailErr.classList.remove('d-block');
            oldEmailErr.classList.contains('d-block') && newEmailErr.classList.remove('d-block');

            newEmail.classList.contains('is-invalid') && newEmail.classList.remove('is-invalid');
            oldEmail.classList.contains('is-invalid') && newEmail.classList.remove('is-invalid');

            firebase.auth().currentUser.updateEmail(newEmail.value).then(function() {

                document.querySelector('[data-details-success="email"]').classList.remove('d-none');

                oldEmail.value = "";
                newEmail.value = "";
            
                setTimeout(function() {
            
                document.querySelector('[data-details-success="email"]').classList.add('d-none');
            
                }, 10000);
            
            }).catch(function(error) {
            
                equalEmErr.innerText = error.message;
                equalEmErr.classList.add('d-block');
                equalEmErr.classList.remove('text-success');
                equalEmErr.classList.add('invalid-feedback'); 
            
            });

        }

    }

    function resetPassword(eRP) {

        eRP.preventDefault();

        const emailForReset = document.querySelector('[data-details-input="reset-password"]');
        const errorForReset = document.querySelector('[data-details-errors="reset-password"]');
        const successForReset = document.querySelector('[data-details-success="reset-password"]');

        if (emailForReset.value === firebase.auth().currentUser.email) {

            emailForReset.classList.remove('is-invalid');
            errorForReset.classList.remove('d-block');
            
            firebase.auth().sendPasswordResetEmail(emailForReset.value).then(function() {

                successForReset.classList.add('d-block');

                document.querySelector('[data-settings="alert"]').classList.remove('d-none');

                emailForReset.value = "";

                setTimeout(function() {
    
                    successForReset.classList.remove('d-block');
    
                }, 7000)

            }).catch(function(error) {
                
                console.warn(error);

            });
            
        } else {
            
            successForReset.classList.remove('d-block');
            emailForReset.classList.add('is-invalid');
            errorForReset.classList.add('d-block');

        }

    }

    function verifyEmail(eVE) {

        eVE.preventDefault();

        const successForVerify = document.querySelector('[data-details-success="verify-email"]')

        firebase.auth().currentUser.sendEmailVerification().then(function() {

            successForVerify.classList.add('d-block');

            setTimeout(function() {

                successForVerify.classList.remove('d-block');
            }, 7000);
        
        }).catch(function(error) {
        
            console.warn(error);

        });
    }

    function promptDeleteModal() {

        document.querySelector('[data-modals="delete"]').classList.add('d-block');

    }

    function deleteAccount() {

        document.cookie = `email=${firebase.auth().currentUser.email}; expires=10 November 2000 00:00:00`;

        firebase.auth().currentUser.delete().then(function() {

            document.querySelector('[data-modals="delete"]').classList.remove('d-block');

            window.location.href = '/';
            
            document.querySelector('[data-alerts="settings"]').classList.add('d-block');

            setTimeout(function() {

                document.querySelector('[data-alerts="settings"]').classList.remove('d-block');

            }, 7000);

        }).catch(function(error) {
            
            document.querySelector('[data-details-errors="delete"]').innerText = error.message;
            
            document.querySelector('[data-details-errors="delete"]').classList.add('d-block');

            document.querySelector('[data-modals="delete"]').classList.remove('d-block');
            
            setTimeout(function() {
                
                document.querySelector('[data-details-errors="delete"]').classList.remove('d-block');
                
            }, 7000)
            
        });
    }

    return (

        <div>

            <h2 className="w-100 bg-dark p-4 text-center mb-0" style={{color: 'white', opacity: '0.5'}}>Change user details</h2>

            <div className="modal bg-dark" style={{opacity: '0.9'}} tabIndex="-1" role="dialog" data-modals="delete">

                <div className="modal-dialog" role="document">
                    
                    <div className="modal-content bg-warning">

                        <div className="modal-header">
                            
                            <h5 className="modal-title text-white">Are you sure you want to permanently delete your account?</h5>
                            <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close" onClick={function() { document.querySelector('[data-modals="delete"]').classList.remove('d-block'); }}>
                            <span aria-hidden="true">&times;</span>
                            </button>

                        </div>

                        <div className="modal-footer justify-content-center">

                            <button className="btn btn-danger w-50" onClick={deleteAccount}>Yes</button>

                        </div>

                    </div>

                </div>

            </div>

            <div style={{backgroundColor: '#fbeaeb', height: 'fit-content'}}>

                <h4 className="bg-dark p-3" style={{color: 'white'}}>Change your user name</h4>

                <div className="pl-2">

                    <p className="text-muted" style={{fontSize: '20px'}}>Fill the input below and press 'Change user name' to change your user name. The input must NOT contain any spaces or special characters ( . / , * % $ # - _ ) and it must be filled with a value. If the action is completed successfully your username will be changed instantly !</p>

                    <form onSubmit={changeUserName} name="change-user-name">

                        <label style={{fontSize: '20px'}} className="font-weight-bold">The new user name: <input type="text" className="form-control" data-details-input="username"></input></label>
                        <input type="submit" className="btn ml-4 btn-dark" value="Change user name"/>

                    </form>

                    <div className="text-muted font-italic pb-2" style={{fontSize: '13px'}}>Maximum characters allowed: 15 !</div>
                    <div className="invalid-feedback pb-2" data-details-errors="username">User name is not valid!</div>

                </div>

            </div>

            <div style={{backgroundColor: '#fbeaeb', height: 'fit-content'}}>

                <h4 className="bg-dark p-3" style={{color: 'white'}}>Change your email</h4>

                <div className="pl-2">

                    <p className="text-muted" style={{fontSize: '20px'}}>After successfully filling the inputs you will recievie an email on the old email that will notify you about the email change. If you correctly filled the inputs and an error is shown it's because you have been signed in for too long and you need to sing out and sign in again. If the action is completed successfully you will have to verify your email again !</p>

                    <form onSubmit={changeEmail} name="change-email">

                        <label style={{fontSize: '20px', width: '300px'}} className="font-weight-bold d-block">The old email: <input type="email" className="form-control" data-details-input="old-email"></input></label>
                        <div className="invalid-feedback" data-details-errors="old-email">The email you entered doesn't match your current email !</div>

                        <label style={{fontSize: '20px', width: '300px'}} className="font-weight-bold d-block mb-3">The new email: <input type="email" className="form-control" data-details-input="new-email"></input></label>
                        <div className="invalid-feedback mb-3" data-details-errors="new-email">This email is not valid !</div>
                        
                        <input type="submit" className="btn btn-dark mb-2" style={{width: '300px'}} value="Change user email"/>

                        <div className="d-none text-success font-weight-bold pb-3" data-details-success="email">Email changed successfully !</div>

                    </form>

                </div>

            </div>

            <div style={{backgroundColor: '#fbeaeb', height: 'fit-content'}}>

                <h4 className="bg-dark p-3" style={{color: 'white'}}>Password</h4>

                <div className="pl-2">

                    <p className="text-muted" style={{fontSize: '20px'}}>Complete the field with your email adress and you will be sent an email to reset your password. Due to security reasons you can only change your password through this way.</p>

                    <form onSubmit={resetPassword} name="reset-password">

                        <label style={{fontSize: '20px', width: '300px'}} className="font-weight-bold d-block mb-3">Enter your email: <input type="email" className="form-control" data-details-input="reset-password"></input></label>
                        <div className="invalid-feedback mb-3" data-details-errors="reset-password">This email does not corespond with your current email !</div>
                        
                        <input type="submit" className="btn btn-dark mb-2" style={{width: '300px'}} onClick={resetPassword} value="Send password reset request"/>

                        <div className="d-none text-success font-weight-bold pb-3" data-details-success="reset-password">Reset password request sent !</div>

                    </form>

                </div>

            </div>

            {!emailVerified && 

            <div style={{backgroundColor: '#fbeaeb', height: 'fit-content'}}>

                <h4 className="bg-dark p-3" style={{color: 'white'}}>Email verification</h4>

                <div className="pl-2">

                    <p className="text-muted" style={{fontSize: '20px'}}>After successfully filling the inputs you will recievie an email on the old email that will notify you about the email change and after you validate your email you will have to re-autenthicate.</p>

                    <form name="verify-email" onSubmit={verifyEmail}>
                        
                        <button className="btn btn-dark mb-2" style={{width: '300px'}}>Send email verification request</button>

                        <div className="d-none text-success font-weight-bold pb-3" data-details-success="verify-email">Email verification request sent !</div>

                    </form>

                </div>

            </div>

            }

            <div style={{backgroundColor: '#fbeaeb', height: 'fit-content'}}>

                <h4 className="bg-dark p-3" style={{color: 'white'}}>Delete account</h4>

                <div className="pl-2">

                    <p className="text-danger" style={{fontSize: '20px'}}>Remember that this action is reversible ! Once you delete your account there is no way back !</p>

                    <div>
                        
                        <button className="btn btn-danger mb-2" style={{width: '300px'}} onClick={promptDeleteModal}>Delete account</button>

                        <div className="d-none text-danger font-weight-bold pb-3" data-details-errors="delete"></div>

                    </div>

                </div>

            </div>

        </div>
    )
}