import React from 'react';


function idGen(){
    return Math.random().toString(32);
}


function Hello(){
    return (
        <div>Hello World!</div>
    );
}

function getThis(){
    console.log(this);
    
}
export {idGen,Hello,getThis};

const greeting = 'Hello World!';

export default greeting;    