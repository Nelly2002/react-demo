import React from 'react';

export default function Div(props){
    console.log(props);
    
    return (
    <div>
        {props.text}
        {props.children[props.children.length-1]}
    </div>
    )
}