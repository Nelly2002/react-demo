import React from 'react';
import classes from './task.css'
/* import './task.css'; */


function Task(props) {
    const {text} = props;
    return (
        <div className = {classes.task}>
            <input type="checkbox"
            onChange={props.onCheck}
            />
            <span
            >{text}</span>
            <button
                onClick={props.onDelete}
            >x</button>
        </div>
    );
}

export default Task;