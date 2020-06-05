import React, { Component } from 'react';
 import classes from './newTask.module.css';
import {
    InputGroup,
    FormControl,
    Button
} from 'react-bootstrap';


class NewTask extends Component {
    state = {
        titleText: '',
        inputText: ''
    }

    titleChangeHandler = (event) => {
        this.setState({ titleText: event.target.value })
    }
    inputChangeHandler = (event) => {
        this.setState({ inputText: event.target.value })
    }


    buttonClickHandler = () => {
        const { titleText, inputText } = this.state;
        if (!titleText || !inputText) return;

        this.props.onAdd(titleText, inputText);
        this.setState({
            titleText: '',
            inputText: ''
        })
    }

    render() {
        
        return (
            <>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Title"
                        aria-label="Title"
                        aria-describedby="Title"
                        value={this.state.titleText}
                        onChange={this.titleChangeHandler}
                    />
                </InputGroup>
                <FormControl as="textarea" aria-label="With textarea" rows="10"
                    placeholder="description"
                    value={this.state.inputText}
                    onChange={this.inputChangeHandler} />
                <InputGroup.Append>
                    <Button variant="info" className={classes.addTask}
                        onClick={this.buttonClickHandler}
                    >Add</Button>
                </InputGroup.Append>

            </>
        );
    }
}

export default NewTask;