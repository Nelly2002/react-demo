import React from 'react';
import classes from './task.module.css';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Button } from 'react-bootstrap';
import { formDate } from '../../helpers/utils';
import { Link } from 'react-router-dom';
import PropTypes  from 'prop-types';



function Task(props) {
    const { data } = props;

    return (
        <>
            <Card style={{ width: '18rem', marginTop: '20px' }}>
                <Card.Header>
                    <input type="checkbox"
                        checked={props.isSelected}
                        onChange={props.onCheck}
                    />
                    <p> {formDate(data.date)}</p>
                    <p> {formDate(data.created_at)}</p>

                </Card.Header>
                <Card.Body>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Text>
                        <span>{data.description}</span>
                    </Card.Text>


                    <>

                        <FontAwesomeIcon className={classes.faicons} icon={faEdit} onClick={() => props.onEdit(data.id)} />
                        <FontAwesomeIcon className={classes.faicons} icon={faTrashAlt} onClick={props.onDelete} />
                        <p>
                            <Button
                                variant="outline-danger"
                                onClick={props.onOpenModal}
                            >
                                Open in modal</Button>
                            </p>
                            <p>
                            <Link to={`/task/${data.id}`}>
                                <Button
                                    variant="outline-danger"
                                    onClick={props.onOpenModal}
                                >
                                    Open in separet page </Button>
                            </Link>

                        </p>

                    </>

                </Card.Body>
            </Card>
        </>
    );


}

Task.propTypes = {
    data:PropTypes.object.isRequired,
    isSelected:PropTypes.bool.isRequired,
    onCheck:PropTypes.func.isRequired,
    onOpenModal:PropTypes.func.isRequired,
    onDelete:PropTypes.func.isRequired,
    onEdit:PropTypes.func.isRequired
}

export default Task;