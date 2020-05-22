import React,{Component} from 'react';
import classes from './task.css'


class Task extends Component {
    constructor(props){
        super(props);
    }

    /* componentDidUpdate(prevProps,prevState){
        console.log('Task updata');
        
    } */
    shouldComponentUpdate(prevProps, prevState){
        return prevProps.text !== this.props.text; 
    }
     
    render() {

        const {text} = this.props;

           return (
             
            <div className={classes.task}  >
                <input type="checkbox"
                    onChange={this.props.onCheck}
                />
               
                    <input type="text" 
                    value = {text}
                    onChange = {this.props.setUpDate}
                     />
                    
                <button
                    onClick={this.props.onDelete}
                >x</button>
            </div>
        );
    }

}

export default Task;