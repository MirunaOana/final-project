import React, {useContext, useEffect, useState} from 'react';
import 'firebase/firestore';
import * as firebase from 'firebase/app';
import { authContext } from './AuthContext';

export default function Rehome() {

    const {uid, displayName, isSignedIn} = useContext(authContext);

    const [raValues, setRAValues] = useState({

        name: '',
        imageUrl: 'No files chosen',
        age: '',
        breed: '',
        neutred: false,
        gender: 'male',
        uid: '',
        user: ''

    });

    function genderFChanges() {
    
        setRAValues({...raValues, gender: 'Female'});

    }

    function genderMChanges() {
    
        setRAValues({...raValues, gender: 'Male'});

    }

    function inputControl(eic) {
        
        if (eic.target.name === 'age') {
            
            setRAValues({...raValues, [eic.target.name]: eic.target.value.substring(0, 2)});
            
        } else {

            if (eic.target.name === 'breed') {
                
                setRAValues({...raValues, [eic.target.name]: eic.target.value.substring(0, 20)});
                
            } else {
                
                setRAValues({...raValues, [eic.target.name]: eic.target.value.substring(0, 10)});

            }

        }

    }

    function raCheck() {

        const raErrors = [document.querySelector('[data-ra-errors="name"]'), document.querySelector('[data-ra-errors="age"]'), document.querySelector('[data-ra-errors="breed"]'), document.querySelector('[data-ra-errors="image"]')]

        let raChecker = true;
        
        if ((!/^[a-zA-z]*$/.test(document.querySelector('[data-ra-input="name"]').value)) || document.querySelector('[data-ra-input="name"]').value === '' || document.querySelector('[data-ra-input="name"]').value.length < 3) {

            raErrors[0].classList.add('d-block');

            raChecker = false;

        } else {

            raErrors[0].classList.remove('d-block');

            raChecker = true;
            
        }

        if ((!/^[a-zA-Z]*$/.test(document.querySelector('[data-ra-input="breed"]').value)) || document.querySelector('[data-ra-input="breed"]').value === '' || document.querySelector('[data-ra-input="breed"]').value.length < 5) {

            raErrors[2].classList.add('d-block');

            raChecker = false;

        } else {

            raErrors[2].classList.remove('d-block');

            raChecker = true;

        }

        if ((!/^[0-9]*$/.test(document.querySelector('[data-ra-input="age"]').value)) || document.querySelector('[data-ra-input="age"]').value === '') {

            raErrors[1].classList.add('d-block');

            raChecker = false;


        } else {

            raErrors[1].classList.remove('d-block');

            raChecker = true;

        }

        if (document.querySelector('[data-ra-input="file"]').files[0] === undefined) {

            raErrors[3].classList.add('d-block');

            raChecker = false;


        } else {

            raErrors[3].classList.remove('d-block');

            raChecker = true;

        }

        return raChecker;

    }

    function submitRA(e) {

        e.preventDefault();

        if (!raCheck()) {
            return;
        }

        if (document.querySelector('[data-checkbox="neutred"]').checked) {

            raValues.neutred = true;

        } else {

            raValues.neutred = false;
        }

        raValues.uid = uid;
        raValues.user = displayName;

        console.log(raValues);

        firebase.firestore().collection("rehomed").add(raValues)
        .then(function(docRef) {

            setRAValues({
            name: '',
            imageUrl: 'No files chosen',
            age: '',
            breed: '',
            neutred: false,
            gender: 'Male',
            uid: '',
            user: '' })

            document.querySelector('[data-ra-label="file"]').innerText = 'No files chosen';
            document.querySelector('[data-ra-input="file"]').value = '';
            document.querySelector('[data-checkbox="neutred"]').checked = true;
            document.querySelector('[data-ra="gender-m"]').checked = true;

            document.querySelector('[data-rehome="alert"]').classList.remove('d-none');

            setTimeout(function() {

                document.querySelector('[data-rehome="alert"]').classList.add('d-none');
                
            }, 3000);
            
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

    }

    return (

        <div>

            {isSignedIn ? (

                <>

                <div className="alert alert-success d-none" role="alert" data-rehome="alert">
                        
                    <h4 className="alert-heading">Bunny placed for rehome succesfully !</h4>
                    <p>You can see your rehome post in the <a href="/adopt">Adopt</a> section.</p>

                </div>

                <div className="w-50 rounded" style={{backgroundColor: '#fbeaeb', margin: 'auto', marginTop: '110px'}} data-ra="content">

                    <h2 className="bg-dark text-white p-2">Rehome a bunny</h2>

                    <p className="m-3 text-muted">If you don't feel up to raise your bunny anymore or you can't afford to you can rehome it and we will find a lovely family to raise it, just fill in the above formular:</p>

                    <form className="font-weight-bold p-4" onSubmit={submitRA}>

                        <label className="d-block">Bunny name: <input type="text" className="form-control" name="name" onChange={inputControl} value={raValues.name} data-ra-input="name"/></label>

                        <div className="font-weight-bold text-muted mb-2">Minimum 3 characters, maximum 10</div>

                        <div className="invalid-feedback font-weight-bold mb-2" data-ra-errors="name">This field must only contain letters and it must have a minimum length of 3 characters !</div>

                        <label className="d-block">Image: 

                            <div className="input-group my-2">

                                <div className="custom-file">

                                    <input type="file" accept="image/*" className="custom-file-input btn" id="inputGroupFile01" data-ra-input="file" onChange={function() {
                                        document.querySelector('[data-ra-label="file"]').innerText = document.querySelector('[data-ra-input="file"]').value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/
                                        )[1];
                                        setRAValues({...raValues, imageUrl: URL.createObjectURL(document.querySelector('[data-ra-input="file"]').files[0])});
                                        
                                    }}/>
                                    <label className="custom-file-label" htmlFor="inputGroupFile01" data-ra-label="file">No files chosen</label>

                                </div>

                            </div>

                        </label>

                        <div className="text-muted mb-2">All formats allowed</div>

                        <div className="invalid-feedback font-weight-bold mb-2" data-ra-errors="image">This field is required !</div>

                        <label className="d-block">Age<span className="text-muted ml-1">(years)</span> : <input type="text" className="form-control mt-2" name="age" value={raValues.age} onChange={inputControl} data-ra-input="age"/></label>

                        <div className="font-weight-bold text-muted mb-2">Maximum 2 characters, only numeric characters allowed</div>

                        <div className="invalid-feedback font-weight-bold mb-2" data-ra-errors="age">Please fill in the input properly !</div>

                        <label className="d-block">Breed: <input type="text" className="form-control" value={raValues.breed} name="breed" onChange={inputControl} data-ra-input="breed"/></label>

                        <div className="font-weight-bold text-muted mb-2">Minimum 5 characters, maximum 20</div>
                        
                        <div className="invalid-feedback font-weight-bold mb-2" data-ra-errors="breed">This field must only contain letters and it must have a minimum length of 5 characters !</div>

                        <label><span className="mr-2">Neutred</span><input type="checkbox" data-checkbox="neutred" defaultChecked/></label>

                        <label className="d-block"><span className="mr-1">Gender:</span>
                            <label className="m-1">M<input type="radio" className="m-2" id="gender" name="gender" data-ra="gender-m" defaultChecked onChange={genderMChanges}/></label>
                            <label>F<input type="radio" className="m-2" id="gender" name="gender" data-ra="gender-f" onChange={genderFChanges}/></label>
                        </label>

                        <input type="submit" value="Place bunny for rehome" className="btn btn-dark font-weight-bold w-100"/>

                    </form>

                </div>

                </>

            ) : (

                <>

                <div className="w-50" style={{backgroundColor: '#fbeaeb', margin: '0 auto', marginTop: '100px'}}>

                    <h2 className="bg-dark text-white p-3 text-center rounded">You must be signed in in order to rehome a Bunny !</h2>

                    <div className="d-flex font-weight-bold p-3">
                        <div className="w-50">Click here to <a href="/sign-in">Sign in</a></div>
                        <div className="w-50 text-right">If you don't have an account you can <a href="/sign-up">Sing up</a></div>
                    </div>


                </div>

                </>
            )}
        </div>
        
    );
}