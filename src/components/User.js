import React from 'react';
import Name from './Name';
import Surname from './Surname'

function User(props){
    
    return (
    <div>
        Hello, I am
        <Name name={props.name}/>
        <Surname surname={props.surname}/>
        
        </div>
    );
}


export default User;