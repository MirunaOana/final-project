import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './Nav';

function App() {
  return (
    <div className="container">
      <Router>
        <Nav />

        <Route exact path="/" component={ () => <h1>Homepage</h1> } />
        
      </Router>
    </div>
  );
}

export default App;