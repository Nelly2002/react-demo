import React, { Component } from 'react';
import Task from './Task';
import { idGen } from '../utils';


class Todo extends Component {
    state = {
        items: [],
        currentItem: {
            text: '',
            key: ''
        }
    }

    inputChangeHandler = (event) => {
        this.setState({
            currentItem: {
                text: event.target.value,
                key: idGen()
            }
        })
    }

    buttonClickHandler = (event) => {
        const newItem = this.state.currentItem;
        console.log(newItem);
        if (newItem.text !== "") {
            const newItems = [...this.state.items, newItem];
            this.setState({
                items: newItems,
                currentItem: {
                    text: '',
                    key: ''
                }
            })
        }
    }


    deleteItem = (key) => {
        const filteredItems = this.state.items.filter(item =>
            item.key !== key);
        this.setState({
            items: filteredItems
        })
    }


    render() {
        return (
            <>
                <input type="text" placeholder='Enter text'
                    value={this.state.currentItem.text}
                    onChange={this.inputChangeHandler}
                />
                <button type='submit' className='add'
                    onClick={this.buttonClickHandler}>Add</button>
                <Task items={this.state.items}
                    deleteItem={this.deleteItem}
                />
            </>
        )
    }
}



export default Todo