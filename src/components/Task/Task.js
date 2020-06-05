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

    /*   componentDidMount(){
          console.log('Task munted');
          
      }
      
      componentDidUpdate(prevProps,prevState){
          console.log('Task updata');
          
      }
      shouldComponentUpdate(prevProps, prevState) {
          return prevProps.text !== this.props.text;
      }  */

    handleEdit = () => {
        this.setState({
            isEdit: true
        });
        this.props.onEdit();
    }

    cancelEdit = () => {
        this.setState({
            isEdit: false
        });
        this.props.onEdit();
    }

    
    saveEdit = (editedText) => {
        this.props.onSaveEdit(editedText);
        this.setState({
            isEdit: false
        });

    }


    render() {

        const { data } = this.props;
        const { isEdit } = this.state;
        const title = data.title;

        return (
            <>
                <Card style={{ width: '18rem', marginTop: '20px' }}>
                    <Card.Header>
                        <input type="checkbox"
                            checked={this.props.isSelected}
                            onChange={this.props.onCheck}
                        />
                        Featured
                        </Card.Header>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
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
                                     
                                    <FontAwesomeIcon className={classes.faicons} icon={faEdit} onClick={this.handleEdit} />
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