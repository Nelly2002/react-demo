import React, { Component } from 'react';
import Task from '../../Task/Task';
import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import classes from './todo.module.css';
import TaskModal from '../../TaskModal/TaskModal';
import Modal from '../../Modal/Modal';
import Search from '../../Search/Search';
import {connect} from 'react-redux';
import getTasks from '../../../store/actions/getTasks';
import editTask from '../../../store/actions/editTask';
import deleteTask from '../../../store/actions/deleteTask';
import deleteBulkTasks from '../../../store/actions/deleteBulkTasks';

class ToDo extends Component {

    state = {
        taskIds: new Set(),
        isEditing: false,
        taskIndex: null,
        editTaskIndex: null,
        showAddTaskModal: false,
        showEditTaskModal: false
    }

    componentDidMount() {
        this.props.getTasks();
    }


    componentDidUpdate(prevProps){
        const searchStr = this.props.location.search;
        if(prevProps.location.search !== searchStr){
            this.props.getTasks(searchStr);
        }
        if(!prevProps.addTaskSuccess && this.props.addTaskSuccess){
            this.setState({showAddTaskModal:false});
        } 
    }


    removeButtonHandler = (taskId) => () => {
        this.setState({
            showEditTaskModal: false,
            taskIndex:null
        });
        this.props.deleteTask(taskId);        
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
        const { taskIds } = this.state;
        const SelectedtaskIds = Array.from(taskIds);
        this.props.deleteBulkTasks(SelectedtaskIds);
        this.setState({taskIds: new Set()})
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

    handleEdit = (taskId) => {
        this.setState({
            showEditTaskModal: true,
            editTaskIndex: this.props.tasks.findIndex(el=> el.id === taskId),

        });        
    }

    selectAllHandler = () => {
        const taskIds = this.props.tasks.map(task => task.id);
        this.setState({ taskIds: new Set(taskIds) });
    };

    deSelectAllHandler = () => {
        this.setState({ taskIds: new Set() });
    };

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

    toggleTaskModal = (type)=>() => {
        this.setState({ [`show${type}TaskModal`]: !this.state[`show${type}TaskModal`] });
    };

    editTask = (taskId, taskData)=>{
        this.props.editTask(taskId,taskData)
        this.setState({
            showEditTaskModal: false
        });
    };


    searchTasks = (data) =>{
        let query = '';

            for(let key in data){
                if(data[key]){
                    query+= `${key}=${data[key]}&`
                } 
            }
            
            this.props.history.push(`/?${query}`);
    };

    render() {
        const { taskIds, taskIndex } = this.state;
        const {tasks} = this.props;

        const tasksArr = tasks.map((task, index) => {
            return (
                <Col key={task.id}  sm='6' md='4' lg='4' xl='3'  >
                    <Task
                        data={task}
                        onDelete={this.removeButtonHandler(task.id)}
                        onCheck={this.handleCheck(task.id)}
                        onSaveEdit={this.handleSaveEdit(task.id)}
                        onEdit={this.handleEdit}
                        isSelected={this.state.taskIds.has(task.id)}
                        onOpenModal={this.handleModalOpen(index)}
                    />
                </Col>
            )
        }

        );

        return (
            <>
             
                <Container fluid>
                    <Row className={classes.inputRow}>
                        <Col>

                            <Search 
                            onSubmit = {this.searchTasks}
                            />
        
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Button
                            style = {{marginTop:'15px'}}
                            className='mx-auto'
                            variant='primary'
                            onClick={this.toggleTaskModal('Add')}
                            >
                            Add task
                    </Button>
                        </Col>
                    </Row>


                    <Row>
                        {tasksArr.length ? 
                            tasksArr :
                            <h2 style = {{margin:'auto'}}>There are no tasks yet!</h2>
                        }
                    </Row>

                    <Row>
                        <Button
                            style = {{marginTop:'15px'}}
                            className='mx-auto'
                            variant='danger'
                            onClick={this.removeBulkHandler}
                            disabled={!taskIds.size}
                        >
                            Remove
                         </Button>
                        {
                            tasks.length !== taskIds.size &&
                            <Button
                                style = {{marginTop:'15px'}}
                                className='mx-auto'
                                variant='secondary'
                                onClick={this.selectAllHandler}
                            >
                                Select all
                         </Button>

                        }

                        {!!taskIds.size &&
                            <Button
                                style = {{marginTop:'15px'}}
                                className='mx-auto'
                                variant='secondary'
                                onClick={this.deSelectAllHandler}
                            >
                                Deselect all
                         </Button>
                        }



                    </Row>
                </Container>
                {taskIndex !== null &&
                    <TaskModal
                        show={taskIndex !== null}
                        onHide={this.handleModalClose}
                        taskData={tasks[taskIndex]}
                        onDelete={this.removeButtonHandler(tasks[taskIndex].id)}
                        onSaveEdit={this.handleSaveEdit(tasks[taskIndex].id)}
                        onEdit={this.handleEdit}
                    />
                }
              

                <Modal
                    type = 'add'
                    show={this.state.showAddTaskModal}
                    onHide={this.toggleTaskModal('Add')}

                />
                <Modal
                    type = 'edit'
                    data = {tasks[this.state.editTaskIndex]}
                    show={this.state.showEditTaskModal}
                    onHide={this.toggleTaskModal('Edit')}
                    onEditTask = {this.editTask}
                />
     
            </>
        );
    }
}

const mapStateToProps = (state)=> {
   return {
       tasks: state.taskReducer.tasks,
       addTaskSuccess:state.taskReducer.addTaskSuccess
   }
}

const mapDispatchToProps = {
    getTasks,
    editTask,
    deleteTask,
    deleteBulkTasks,
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);