import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import classes from './style.module.css';
import { withSnackbar } from 'notistack';
import Task from '../../Task/Task';


class SingleTask extends Component {
    state = {
        task:null,
    }

    componentDidMount(){
        fetch( `http://localhost:3001/tasks/${this.props.match.params.id}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
               
                    if (data.error) {
                        throw data.error;
                    }
                    this.setState({ task: data });
                
                
            })
            .catch(error => {
                this.props.enqueueSnackbar(error.toString(), {
                    variant: 'error',
                });

            });
    }

   
        
  
    
    deleteTask = () =>{
        const taskId = this.props.match.params.id;
        fetch(`http://localhost:3001/tasks/${taskId}`,{
            method: 'Delete',

        })
        .then(res => res.json())
        .then(response => {
            if (response.error) {
                throw response.error;
            }
            this.props.history.push('/')

        })
        .catch(error => {
            this.props.enqueueSnackbar(error.toString(), {
                variant: 'error',
            });

        })

    }

      render() {
       
            const {task} = this.state
           
        return (
            <>
           <p className={classes.heading}>Single task page</p>
           {
               task!==null &&  <Task  
               data={task}
               />   
           }
           <Button
           variant="outline-danger"
           onClick={this.deleteTask}
           disabled={!task}  
            >
           Delete task</Button>
            </>
        );
    }
}

export default withSnackbar(SingleTask); 


