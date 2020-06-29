import React, { useEffect } from 'react';
import { Button,Card } from 'react-bootstrap';
import classes from './style.module.css';
import {connect} from 'react-redux';
import singelTask from '../../../store/actions/singleTask';
import {formDate} from '../../../helpers/utils';
import deleteSingleTask from '../../../store/actions/deleteTask';
import PropTypes from 'prop-types';


function SingleTask (props){

    useEffect(()=>{
        const taskId=props.match.params.id;
        props.singelTask(taskId)
    },[])

    const deleteTask = () =>{
        const taskId = props.match.params.id;
        props.deleteSingleTask(taskId);
        props.history.push('/')
    }

            const {singleTaskData} = props
           
        return (
            <>
            {singleTaskData  &&
                <>
                    <h1 className={classes.heading}>Single task page</h1>
                    <Card style={{ width: '25rem', margin: '25px auto ' }}>
                        <Card.Header>

                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{singleTaskData.title}</Card.Title>
                            <Card.Text>
                                {singleTaskData.description}
                            </Card.Text>
                            <Card.Text className={classes.date}>
                            Creation date {formDate(singleTaskData.created_at)}
                            </Card.Text>
                            <Card.Text className={classes.date}>
                            Creation date {formDate(singleTaskData.date)}
                            </Card.Text>

                        </Card.Body>
                    </Card>
                    <Button
                        variant="danger"
                        onClick={deleteTask}
                        disabled={!singleTaskData}
                        className={classes.button}
                    >
                        Delete task
                </Button>
                </>

             }
            </>
        );
    
}

const mapStateToProps=(state)=>{
    return{
        singleTaskData:state.taskReducer.singleTaskData
    }
}

const mapDispatchtoProps={
    singelTask,
    deleteSingleTask
}


SingleTask.propTypes={
    singleTaskData:PropTypes.object.isRequired,
    singelTask:PropTypes.func.isRequired,
    deleteSingleTask:PropTypes.func.isRequired,
}



export default connect(mapStateToProps,mapDispatchtoProps)(React.memo(SingleTask));



