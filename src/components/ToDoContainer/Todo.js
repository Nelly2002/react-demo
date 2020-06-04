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
import TaskModal from  '../TaskModal/TaskModal';



class Todo extends Component {

    state = {
        tasks: [],
        taskIds: new Set(),
        isEditing: false,
        taskIndex:null
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
            taskIds: newTaskIds,
            taskIndex:null
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

        this.setState({
            taskIds: new Set(taskIds)
        });


    }

    deselectAllHandler = () => {
        this.setState({
            taskIds: new Set
        });
    }

    handleModalClose = ()=>{
        this.setState({
            taskIndex:null
        });
    }

    handleModalOpen = (taskIndex)=> ()=>{
        
        this.setState({
            taskIndex:taskIndex
        });
    }

    render() {

        const {tasks,taskIds,isEditing,taskIndex}=this.state;
         
        const tasksArr = tasks.map((task,index) => {   
                return (
                    <Col key={task.id} md='6' lg='4' xl='3' sm='6'>
                        <Task
                            text={task.text}
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
            <Container fluid >
                <Row className={classes.inputRow}>
                    <Col>
                        <NewTask
                            onTaskAdd={this.addTask}
                            disabled={isEditing}
                        />
                    </Col>
                </Row>
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
            show = {taskIndex !== null}
            onHide={this.handleModalClose}
            taskData = {tasks[taskIndex]} 
            onDelete={this.removeButtonHendler(tasks[taskIndex].id)}
            onSaveEdit={this.handleSaveEdit(tasks[taskIndex].id)}
            onEdit={this.handleEdit}
            />}
            </>

        );
    }
}

export default Todo