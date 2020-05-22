import React, { Component } from 'react';
import Task from './Task/Task';
import { idGen } from '../utils';
import NewTask from './NewTask';


class Todo extends Component {

    state = {
        tasks: [],
        taskIds: new Set()
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
    setUpDate = (text, id) => {
       
        const newTasks = this.state.tasks;
        newTasks.map(item => {
            if (item.id === id) {
                item.text = text

            }
        })
        this.setState({
            tasks: newTasks

        })

    }

    render() {

        const tasks = this.state.tasks
            .map(({ id, text }) => {

                return (
                    <Task
                        key={id}
                        text={text}
                        onDelete={this.removeButtonHendler(id)}
                        onCheck={this.handleCheck(id)}
                        setUpDate={(e) => this.setUpDate(e.target.value, id)}
                    />
                )



            })

        return (
            <>
                <div>
                    <NewTask
                        onTaskAdd={this.addTask}
                    />
                </div>
                <div style={{
                    textAlign: 'center'
                }}>
                    {tasks}
                    <button style={{
                        backgroundColor: ' rgb(199, 228, 93)',
                        border: 'none',
                        padding: '9px',
                        color: 'black',
                        borderRadius: '5px',
                        fontSize: '15px'
                    }}
                        onClick={this.removeBulkHandler}
                        disabled={!this.state.taskIds.size}
                    >
                        Remove
                    </button>
                </div>
            </>
        );
    }
}

export default Todo