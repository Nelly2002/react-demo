import React, { Component } from 'react';
import { Modal, Button, InputGroup, FormControl ,Form} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {connect}  from 'react-redux';
import addTask from '../../store/actions/addTask';


class AddEditModal extends Component {
  constructor(props){
    super(props);
    this.initialState = {
      title:'',
      date:'',
      description:''
    };
  

    this.state = this.initialState;
  }
  

  componentDidUpdate(prevProps,prevState){
      if(prevProps.show && !this.props.show){
        this.setState(this.initialState);    
      }
      else if(!prevProps.show && this.props.show){
        this.setState(this.props.data);
      }
  }

  onChangeHandler =(type)=> (event)=>{
    this.setState({
      [type]:event.target.value
    })
      
  } 

  addTask = ()=>{
    const {title,date,description} = this.state;
    
    const taskData = {
      title,
      date,
      description
    };

    this.props.addTask(taskData)
  }

  editTask = ()=>{
    const {title,date,description ,id} = this.state;
    const {data} = this.props 
    const taskData = {};

    (title !== data.title) && (taskData.title = title);
    (date !== data.date) && (taskData.date = date);
    (description !== data.description) && (taskData.description = description);

    this.props.onEditTask(id,taskData);
  }

  
  render() {
   
    
    const {title,date,description}=this.state
    
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {
              this.props.type === 'add'?'Add new Task':'Edit task'
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <Form.Label>Title</Form.Label>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Title"
              aria-label="Title"
              aria-describedby="Title"
              value={title}
              onChange={this.onChangeHandler('title')}

            />
          </InputGroup>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control 
            as="textarea" rows="3"
            value={description}
            onChange={this.onChangeHandler('description')}
             />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Choose date</Form.Label>
            <p>
              <input type="date"
              value={date.slice(0,10)}
              onChange={this.onChangeHandler('date')}
              />
            </p>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {
            this.props.type === 'add'?
            <Button variant="outline-primary"
            onClick={this.addTask}
            disabled={!title}
          >Add</Button>:
          <Button variant="outline-primary"
          onClick={this.editTask}
          disabled={!title}
          >Save</Button>
          }
         
          <Button variant="outline-danger"
            onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }


}

AddEditModal.propTypes = {
    type:PropTypes.string.isRequired,
    show:PropTypes.bool.isRequired,
    onHide:PropTypes.func.isRequired,
    onAddTask:PropTypes.func,
    onEditTask:PropTypes.func
};



export default connect(null,{
  addTask,
})(AddEditModal);



