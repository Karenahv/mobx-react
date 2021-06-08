import {FunctionComponent, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import User from "../../stores/data/user";
import {useStore} from "../../stores/helpers/use-store";
import Todo from "../../stores/data/Todo";
import TodoList from "../todosList/TodoList";

interface Props {
    user: User
}

const UserComponent: FunctionComponent<Props> = observer(({user}) => {
    const [todosUser, setTodosUser] = useState([])
    const {dataStore: {userStore}} = useStore()


    const handleRemoveUser = () =>{
        userStore.removeUser(user.name)
    }

    return (
        <>
            <div>User: {user.name}</div>
             <button onClick={handleRemoveUser}>Remove User</button>
            <div>
                Todos:
                <div>
                    <TodoList user={user}/>
                </div>


            </div>
        </>
    )
})

export default UserComponent