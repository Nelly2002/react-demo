import React from 'react';
//import logo from './logo.svg';
import './App.css';
/* import Person from './components/Person';
import {Hello} from './tools'
import * as newObj from './tools';
import User from './components/User';
import Animal from './components/Animal';
import Input from './components/Input'; 
import Div from './components/HOC/Div'; */
import Todo from './components/Todo';



// newObj.getThis();

function App() {
  
  
  // const surname = 'Gates';
  return (
    <div className="App">
    { /*  <User name = "Bill" surname = {surname}/>
      <User name = "John" surname = 'Doe'/>
      <User name = "Mark" surname = 'Clark'/>
      <Animal type='dog' age={0}/>
      <Input/> */}
      <Todo/>
     {/*  <Div text='hello'>
        <span>text</span>
        <p>dsjmnx</p>
        <a href="/">Click me</a>
        </Div> */}
    </div>
  );
}

export default App;
