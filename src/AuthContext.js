import React, {useEffect, useState} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

const authContext = React.createContext({
    isSignedIn: false,
    user: null
});

function ACProvider({children}) {

    const [acValues, setAcValues] = useState({
        isSignedIn: false,
        user: null
    });

    useEffect(function() {

        firebase.auth().onAuthStateChanged(function(user) {

            if (user) {
              
                console.log({user});
                setAcValues({
                    isSignedIn: true,
                    user
                });

            } else {

                setAcValues({
                    isSignedIn: false,
                    user: null
                });

            }
          });

    }, []);

    return (

        
        <authContext.Provider value={acValues}>
            {children}
        </authContext.Provider>
    );
}

export {authContext, ACProvider};