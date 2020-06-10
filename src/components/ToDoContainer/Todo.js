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
import Modal from '../Modal/Modal';
import { withSnackbar } from 'notistack';



class Todo extends Component {

    state = {
        tasks: [],
        taskIds: new Set(),
        isEditing: false,
        taskIndex: null,
        editTaskIndex:null,
        showAddTaskModal: false,
        showEditTaskModal:false
    }

    componentDidMount() {
        fetch('http://localhost:3001/tasks', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                this.setState({ tasks: data });
            })
            .catch(error => {
                this.props.enqueueSnackbar(error.toString(), {
                    variant: 'error',
                });

            });
    }


    addTask = (taskData) => {

        
        fetch('http://localhost:3001/tasks', {
            method: 'POST',
            body: JSON.stringify(taskData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            if (response.error) {
                throw response.error;
            }
            this.props.enqueueSnackbar('Task add successfully', {
                variant: 'success',
            });
            this.setState({
                tasks: [...this.state.tasks, response],
                showAddTaskModal: false
            });

        })
        .catch(error => {
            this.props.enqueueSnackbar(error.toString(), {
                variant: 'error',
            });
        
        })

    }

    removeButtonHendler = (taskId) => () => {

        fetch(`http://localhost:3001/tasks/${taskId}`,{
            method: 'Delete',

        })
        .then(res => res.json())
        .then(response => {
            if (response.error) {
                throw response.error;
            }
            if(response.success){
                this.props.enqueueSnackbar('Task Edited successfully', {
                    variant: 'success',
                });
            }
            else{
                throw new Error('Something went wrong');
            }
            const tasks = [...this.state.tasks];
            const taskIndex = this.state.tasks.findIndex(task => task.id === response.id);
            tasks[taskIndex] = response;
            this.setState({
                tasks,
                showEditTaskModal: false
            });

        })
        .catch(error => {
            this.props.enqueueSnackbar(error.toString(), {
                variant: 'error',
            });

        })



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

    handleSaveEdit = (id) => (title,description,taskData) => {

        
    }

    handleEdit = (taskId) => {
        this.setState({
            showEditTaskModal:true,
            editTaskIndex:this.state.tasks.findIndex(el=>el.id === taskId)
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

    toggleTaskModal =(type)=> () => {
        console.log(`show${type}TaskModal`)
        this.setState({[`show${type}TaskModal`]: !this.state[`show${type}TaskModal`]})
    }

    openAddTaskModal = () => {
        this.setState({ showAddTaskModal: true })
    }

    editTask = (taskId,taskData) =>{
        fetch(`http://localhost:3001/tasks/${taskId}`,{
            method: 'PUT',
            body: JSON.stringify(taskData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            if (response.error) {
                throw response.error;
            }
            this.props.enqueueSnackbar('Task Edited successfully', {
                variant: 'success',
            });
            const tasks = [...this.state.tasks];
            const taskIndex = this.state.tasks.findIndex(task => task.id === response.id);
            tasks[taskIndex] = response;
            this.setState({
                tasks,
                showEditTaskModal: false
            });

        })
        .catch(error => {
            this.props.enqueueSnackbar(error.toString(), {
                variant: 'error',
            });

        })


    };

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

                <Container fluid >
                    <Row>
                        <Col>
                            <Button
                                className={classes.addTask}
                                variant="secondary"
                                onClick={this.openAddTaskModal}
                            >
                                Add Task    </Button>
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
                        
                        show={taskIndex !== null}
                        onHide={this.handleModalClose}
                        description={tasks[taskIndex].description}
                        title={tasks[taskIndex].title}
                        onDelete={this.removeButtonHendler(tasks[taskIndex].id)}
                        onSaveEdit={this.handleSaveEdit(tasks[taskIndex].id)}
                        onEdit={this.handleEdit}
                    />}
                <Modal
                    type='add'
                    show={this.state.showAddTaskModal}
                    onHide={this.toggleTaskModal('Add')}
                    onAddTask={this.addTask}
                />
                 <Modal
                    type='edit'
                    data = {tasks[this.state.editTaskIndex]}
                    show={this.state.showEditTaskModal}
                    onHide={this.toggleTaskModal('Edit')}
                    onEditTask={this.editTask}
                />

            </>

        );
    }
}

export default withSnackbar(Todo); 