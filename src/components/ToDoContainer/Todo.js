import React, { Component } from 'react';
import Task from '../Task/Task';
import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import classes from './todo.module.css';
import TaskModal from '../TaskModal/TaskModal';
import InputModal from '../InputModal/InputModal';



class Todo extends Component {

    state = {
        tasks: [],
        taskIds: new Set(),
        isEditing: false,
        taskIndex: null,
        openModal: false
    }

    componentDidMount() {
        fetch('http://localhost:3001/tasks', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ tasks: data });
            })
            .catch(err => {
                console.log('err', err);
            });
    }

    addTask = (titleText,inputText) => {
        const data = {
            title: titleText,
            description: inputText,
        }

        fetch('http://localhost:3001/tasks', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ 
                    tasks: [...this.state.tasks, data] ,
                    openModal: false
                });
            })
            .catch(err => {
                console.log('err', err);
            });

    }

    removeButtonHendler = (taskId) => () => {

        const newTasks = this.state.tasks.filter(({ id }) => taskId !== id);
        const newTaskIds = new Set(this.state.taskIds);
        newTaskIds.delete(taskId);

        this.setState({
            tasks: newTasks,
            taskIds: newTaskIds,
            taskIndex: null
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

    selectAllHandler = () => {
        const taskIds = this.state.tasks.map(task => task.id);
        this.setState({ taskIds: new Set(taskIds) });
    };


    deselectAllHandler = () => {
        this.setState({
            taskIds: new Set
        });
    }

    handleModalClose = () => {
        this.setState({
            taskIndex: null
        });
    }

    handleModalOpen = (taskIndex) => () => {

        this.setState({
            taskIndex: taskIndex
        });
    }

    handleInputModalClose = () => {
        this.setState({ openModal: false })
    }

    handleOpenModal=()=>{
        this.setState({ openModal: true })
    }
    render() {

        const { tasks, taskIds, isEditing, taskIndex } = this.state;

        const tasksArr = tasks.map((task, index) => {
            return (
                <Col key={task.id} md='6' lg='4' xl='3' sm='6'>
                    <Task
                        data={task}
                        onDelete={this.removeButtonHendler(task.id)}
                        onCheck={this.handleCheck(task.id)}
                        onSaveEdit={this.handleSaveEdit(task.id)}
                        onEdit={this.handleEdit}
                        isSelected={taskIds.has(task.id)}
                        onOpenModal={this.handleModalOpen(index)}
                    />
                </Col>

            )



        })

        return (
            <>
                    <Button
                        className={classes.addTask}
                        variant="secondary"
                        onClick={this.handleOpenModal}
                    >
                    Add Task    </Button>
                <Container fluid >
                    <Row>
                        {tasksArr}
                    </Row>
                    <Row>
                        <Button variant="danger"
                            style={{ marginTop: '20px' }}
                            className='mx-auto'
                            onClick={this.removeBulkHandler}
                            disabled={!taskIds.size}
                        >
                            Remove
                    </Button>
                        {
                            tasks.length !== taskIds.size &&
                            <Button variant="secondary"
                                style={{ marginTop: '20px' }}
                                className='mx-auto'
                                onClick={this.selectAllHandler}
                            >
                                Select All
                            </Button>
                        }
                        {
                            !!taskIds.size &&
                            <Button variant="secondary"
                                style={{ marginTop: '20px' }}
                                className='mx-auto'
                                onClick={this.deselectAllHandler}
                            >
                                Deselect All
                        </Button>
                        }

                    </Row>

                </Container>
                {taskIndex !== null &&
                    <TaskModal
                        show={taskIndex !== null}
                        onHide={this.handleModalClose}
                        taskData={tasks[taskIndex].description}
                        title={tasks[taskIndex].title}
                        onDelete={this.removeButtonHendler(tasks[taskIndex].id)}
                        onSaveEdit={this.handleSaveEdit(tasks[taskIndex].id)}
                        onEdit={this.handleEdit}
                    />}
                <InputModal
                    show={this.state.openModal}
                    onHide={this.handleInputModalClose}
                    onTaskAdd={this.addTask}
                />

            </>

        );
    }
}

export default Todo