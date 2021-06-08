import React from 'react'
import Todo from "./stores/data/Todo";
import TodoStore from "./stores/data/todo-store";
import {Observer, observer} from "mobx-react-lite";

const newTodo = new Todo('New Todo', 99, new TodoStore())
console.log(newTodo.name)

const Test4 = observer(() => {
    return (
        <div>
            <div>{newTodo.name}</div>
            <div>{newTodo.name}</div>
            <button onClick={()=>newTodo.updateName('first name')}>First Name update</button>
            <button onClick={()=> newTodo.updateName('last Name')}>Last Name update</button>
        </div>
    )
})

export default Test4