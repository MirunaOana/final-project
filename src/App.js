import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './Nav';
import * as firebase from 'firebase/app';
import LoginRegister from './Login&Register';
import {ACProvider} from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const firebaseConfig = {
  apiKey: "AIzaSyDRVjfTfN6h8pAe4L8CNr3G60rvE0w-cew",
  authDomain: "siit6-final.firebaseapp.com",
  databaseURL: "https://siit6-final.firebaseio.com",
  projectId: "siit6-final",
  storageBucket: "siit6-final.appspot.com",
  messagingSenderId: "377117355732",
  appId: "1:377117355732:web:d6cdce18f9aaadc86a9541"
};

firebase.initializeApp(firebaseConfig);

function App() {

  return (

    <ACProvider>

      <div style={{marginTop: '180px'}}>

        <Router>

          <Nav />

          <Route exact path="/" component={ () => <h1>Homepage</h1> } />
          <Route exact path="/sign-in" component={ LoginRegister } />
          <Route exact path="/sign-up" component={ LoginRegister } />
          
        </Router>

      </div>

    </ACProvider>

  );
}

export default App;
