import React, { Component } from 'react';
// import classes from './newTask.module.css';
import {
    InputGroup,
    FormControl,
    Button
} from 'react-bootstrap';


class NewTask extends Component {
    state = {
        inputText: ''
    }

    inputChangeHandler = (event) => {
        this.setState({ inputText: event.target.value })
    }

    buttonClickHandler = () => {
        const { inputText } = this.state;
        if (!inputText) return;

        this.props.onTaskAdd(inputText);
        this.setState({ inputText: '' })
    }

    render() {
        const { disabled } = this.props
        return (
            <>
                <InputGroup>
                    <FormControl
                        placeholder="Create new task"
                        aria-label="Create new task"
                        aria-describedby="Create new task"
                        disabled={disabled}
                        value={this.state.inputText}
                        onChange={this.inputChangeHandler}
                    />
                    <InputGroup.Append>
                        <Button variant="info"
                         disabled={disabled}
                         onClick={this.buttonClickHandler}
                        >Add</Button>
                    </InputGroup.Append>
                </InputGroup>
            </>
        );
    }
}

export default NewTask;