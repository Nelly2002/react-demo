import React, { Component } from 'react';
import './task.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faEdit ,faCheck,faTimes} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';

library.add(faTrash,faEdit,faCheck,faTimes);



class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
            editText: props.text
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

    handleInputChange = (event) => {
        this.setState({
            editText: event.target.value
        });
    }

    cancelEdit = () => {
        this.setState({
            isEdit: false,
            editText: this.props.text
        });
        this.props.onEdit();
    }

    saveEdit = () => {
        this.props.onSaveEdit(this.state.editText);
        this.setState({
            isEdit: false
        });

    }

 

    render() {

        const { text } = this.props;
        const { isEdit } = this.state;
        const title =  text.slice(0,15);

        return (
            <>
                <Card style={{ width: '18rem',marginTop:'20px'}}>
                    <Card.Header>
                        <input type="checkbox"
                            onChange={this.props.onCheck}
                        />
                        Featured
                        </Card.Header>
                    <Card.Body>
                    <Card.Title>{title}</Card.Title>
                        <Card.Text>
                            {isEdit ?
                                <input type="text"
                                    value={this.state.editText}
                                    onChange={this.handleInputChange}
                                /> : <span>{text}</span>
                            }
                        </Card.Text>
                        {
                            isEdit ?
                                <>
                                    <FontAwesomeIcon className='faicons' icon='check' onClick={this.saveEdit} />
                                    <FontAwesomeIcon className='faicons' icon='times' onClick={this.cancelEdit}></FontAwesomeIcon>
                                </> :
                                <>
                                    <FontAwesomeIcon className='faicons' icon='edit' onClick={this.handleEdit} />
                                    <FontAwesomeIcon className='faicons' icon='trash' onClick={this.props.onDelete} />

                                </>
                        }
                    </Card.Body>
                </Card>
            </>
        );
    }

}

export default Task;