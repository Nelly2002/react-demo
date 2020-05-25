import React, { Component } from 'react';
import classes from './task.css'


class Task extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            isEdit:false,
            editText:props.text
        }
    }

    /* componentDidUpdate(prevProps,prevState){
        console.log('Task updata');
        
    } */
  /*   shouldComponentUpdate(prevProps, prevState) {
        return prevProps.text !== this.props.text;
    } */

    handleEdit = ()=>{
        this.setState({
            isEdit:true 
        })
    }

    handleInputChange = (event)=>{
        this.setState({
            editText:event.target.value
        });
    }

    cancelEdit = ()=>{
        this.setState({
            isEdit:false,
            editText:this.props.text
        })
    }

    saveEdit = ()=>{
        this.props.onEdit(this.state.editText);
        this.setState({
            isEdit:false
        });
    }

    render() {

        const {text} = this.props;
        const {isEdit}=this.state;

        return (

            <div className={classes.task}  >
                <input type="checkbox"
                    onChange={this.props.onCheck}
                />
                {isEdit ?   
                    <input type="text"
                    value={this.state.editText}
                    onChange={this.handleInputChange} 
                />: <span>{text}</span>
                }
                {
                    isEdit ?
                    <>
                        <button  onClick = {this.saveEdit}>save</button>
                        <button onClick = {this.cancelEdit}>Cancel</button>
                    </>:
                    <>
                    <button
                    onClick={this.handleEdit}
                    >Edit</button>
                    <button
                        onClick={this.props.onDelete}
                    >x</button>
                    </>
                }
               
                
            </div>
        );
    }

}

export default Task;