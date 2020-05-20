import React, { Component } from 'react';
import classes from './newTask.css';

class NewTask extends Component {
    state = {
        inputText:''
    }

    inputChangeHandler = (event)=>{
        this.setState({inputText:event.target.value})
    }

    buttonClickHandler = ()=>{
        const {inputText} = this.state; 
        if(!inputText) return;

        this.props.onTaskAdd(inputText);
        this.setState({inputText:''})
    }

    render() {
        return (
            <div  className = {classes.todo}>
                <input type="text"
                    value={this.state.inputText}
                    onChange={this.inputChangeHandler}
                />
                <button 
                    onClick={this.buttonClickHandler}
                >Add</button>
            </div>
        );
    }


}

export default NewTask;