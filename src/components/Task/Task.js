import React, { Component } from 'react';
import classes  from './task.module.css';
import { faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card,Button } from 'react-bootstrap';
import EditTask from  '../EditTask';
import {formDate} from '../../helpers/utils';
import {Link} from 'react-router-dom';



class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false
        }
    }

  



    render() {

        const { data } = this.props;
        const { isEdit } = this.state;


        return (
            <>
                <Card style={{ width: '18rem', marginTop: '20px' }}>
                    <Card.Header>
                        <input type="checkbox"
                            checked={this.props.isSelected}
                            onChange={this.props.onCheck}
                        />
                        <p> {formDate(data.date)}</p>
                        <p> {formDate(data.created_at)}</p>
                       
                        </Card.Header>
                    <Card.Body>
                        <Card.Title>{data.title}</Card.Title>
                        <Card.Text>
                            <span>{data.description}</span>
                        </Card.Text>
                        {
                            isEdit ?
                            <EditTask

                            />
                                :
                                <>
                                     
                                    <FontAwesomeIcon className={classes.faicons} icon={faEdit} onClick={()=>this.props.onEdit(data.id)} />
                                    <FontAwesomeIcon className={classes.faicons} icon={faTrashAlt} onClick={this.props.onDelete} />
                                    <p>
                                        <Button
                                            variant="outline-danger"
                                            onClick={this.props.onOpenModal}
                                        >
                                            Open in modal</Button>
                                            <Link to={`/task/${data.id}`}>
                                            <Button
                                            variant="outline-danger"
                                            onClick={this.props.onOpenModal}
                                        >
                                        Open in separet page </Button>
                                            </Link>
                                          
                                    </p>
                                    
                                </>
                        }
                    </Card.Body>
                </Card>
            </>
        );
    }

}

export default Task;