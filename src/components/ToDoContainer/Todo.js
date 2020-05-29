import React, { Component } from 'react';
import Task from '../Task/Task';
import { idGen } from '../../helpers/utils';
import NewTask from '../NewTask/NewTask';
import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import classes from './todo.module.css';



class Todo extends Component {

    state = {
        tasks: [],
        taskIds: new Set(),
        isEditing: false
    }

    addTask = (inputText) => {
        const tasks = [...this.state.tasks];

        tasks.push({
            id: idGen(),
            text: inputText
        });
        this.setState({ tasks });

    }

    removeButtonHendler = (taskId) => () => {

        const newTasks = this.state.tasks.filter(({ id }) => taskId !== id);
        const newTaskIds = new Set(this.state.taskIds);
        newTaskIds.delete(taskId);

        this.setState({
            tasks: newTasks,
            taskIds: newTaskIds
        });
    }

    handleCheck = (taskId) => () => {
        let taskIds = new Set(this.state.taskIds);


        if (taskIds.has(taskId)) {
            taskIds.delete(taskId);
        }
        else {
            taskIds.add(taskId);
        }
        this.setState({ taskIds });

    }

    removeBulkHandler = () => {
        let { tasks, taskIds } = this.state;

        taskIds.forEach(id => {
            tasks = tasks.filter(task => task.id !== id);
        });

        this.setState({
            tasks,
            taskIds: new Set()
        });

    }

    handleSaveEdit = (id) => (text) => {
        const tasks = JSON.parse(JSON.stringify(this.state.tasks));

        for (let task of tasks) {
            if (task.id === id) {
                task.text = text;
                break;
            }
        }
        this.setState({
            tasks,
            isEditing: false
        });
    }

    handleEdit = () => {
        this.setState({
            isEditing: !this.state.isEditing
        });

    }

    render() {

        const tasks = this.state.tasks
            .map(({ id, text }) => {

                return (
                    <Col  key={id} md='6' lg='4' xl='3' sm='6'>
                        <Task
                            text={text}
                            onDelete={this.removeButtonHendler(id)}
                            onCheck={this.handleCheck(id)}
                            onSaveEdit={this.handleSaveEdit(id)}
                            onEdit={this.handleEdit}

                        />
                    </Col>

                )



            })

        return (
            <Container fluid >
                <Row className={classes.inputRow}>
                    <Col>
                    <NewTask
                    onTaskAdd={this.addTask}
                    disabled={this.state.isEditing}
                />
                    </Col>
                </Row>
                <Row>
                    {tasks}
                </Row>
                <Row>
                <Button variant="danger" 
                        style={{marginTop:'20px'}}
                        className='mx-auto'
                        onClick={this.removeBulkHandler}
                        disabled={!this.state.taskIds.size}
                >
                    Remove
                </Button>
                </Row>
            </Container>         
        
        );
    }
}

export default Todo