import React, {FunctionComponent} from 'react'
import Todo from "../../stores/data/Todo";

interface Props {
    todo: Todo
}

const TodoComponent: FunctionComponent<Props> = ({todo})=>{
    return(
        <li>
            Name: {todo.name}, userId q{todo.userId}
        </li>
    )
}

export default TodoComponent