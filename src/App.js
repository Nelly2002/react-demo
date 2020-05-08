import React from 'react';
import logo from './logo.svg';
import './App.css';
//import Person from './components/Person';
// import {Hello} from './tools'
//import * as newObj from './tools';
import User from './components/User';

// newObj.getThis();

function App() {
  const surname = 'Gates';
  return (
    <div className="App">
      <User name = "Bill" surname = {surname}/>
      <User name = "John" surname = 'Doe'/>
      <User name = "Mark" surname = 'Clark'/>

    </div>
  );
}

export default App;
