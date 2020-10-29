import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './Nav';
import * as firebase from 'firebase/app';
import LoginRegister from './Login&Register';
import {ACProvider} from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Settings from './Settings';
import Homepage from './Homepage';
import About from './About';
import Contact from './Contact';
import Rehome from './Rehome';
import 'firebase/firestore';
import Adopt from './Adopt';

firebase.initializeApp({
  apiKey: "AIzaSyDRVjfTfN6h8pAe4L8CNr3G60rvE0w-cew",
  authDomain: "siit6-final.firebaseapp.com",
  databaseURL: "https://siit6-final.firebaseio.com",
  projectId: "siit6-final",
  storageBucket: "siit6-final.appspot.com",
  messagingSenderId: "377117355732",
  appId: "1:377117355732:web:d6cdce18f9aaadc86a9541"
});

function App() {

  return (

    <ACProvider>

      <div style={{marginTop: '70px'}}>

        <Router>

          <Nav />

          <Route exact path="/" component={ Homepage } />
          <Route exact path="/adopt" component={ Adopt } />
          <Route exact path="/about" component={ About } />
          <Route exact path="/rehome" component={ Rehome } />
          <Route exact path="/contact" component={ Contact } />

          <Route exact path="/sign-in" component={ LoginRegister } />
          <Route exact path="/sign-up" component={ LoginRegister } />
          <Route exact path="/settings" component={ Settings }/>
          <Route exact path="/admin-request" component={ () => <h1>Req</h1> }/>
          
        </Router>

      </div>

    </ACProvider>

  );
}

export default App;
