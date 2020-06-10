import React, { Component } from 'react';
import classes  from './task.module.css';
import { faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card,Button } from 'react-bootstrap';
import EditTask from  '../EditTask';




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
                        {data.date}
                        </Card.Header>
                    <Card.Body>
                        <Card.Title>{data.title}</Card.Title>
                        <Card.Text>
                            <span>{data.description}</span>
                        </Card.Text>
                        {
                            isEdit ?
                            <EditTask
                            text = {this.props.text}
                            onCancelEdit={this.cancelEdit}
                            onSaveEdit={this.saveEdit}
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
                                            View</Button>
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