import React from 'react'
import './list.css';

function Task(props){
    const items = props.items;
    const listItems = items.map(item =>{
        return <div className="list" key={item.key}>
                <p>{item.text}
                <button
                onClick={()=> props.deleteItem(item.key)}

                >
                    Delete
                </button>
                </p>
    
                </div>
    })
    return (
    <div>{listItems}</div>
    )
}



export default Task;