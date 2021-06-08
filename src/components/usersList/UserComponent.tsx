import {FunctionComponent, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import User from "../../stores/data/user";
import {useStore} from "../../stores/helpers/use-store";
import Todo from "../../stores/data/Todo";

interface Props {
    user: User
}

const UserComponent: FunctionComponent<Props> = observer(({user}) => {
    const [todosUser, setTodosUser] = useState([])
    const {dataStore: {userStore}} = useStore()

    useEffect(()=>{
        const tdoUser = user.todos
        debugger;
        // @ts-ignore
        setTodosUser(tdoUser)
    }, [user.id])

    const handleRemoveUser = () =>{
        userStore.removeUser(user.name)
    }

    return (
        <>
            <div>User: {user.name}</div>
            <div>
                Todos:
                {
                    Array.isArray(todosUser) && todosUser.map(t=>{
                        console.log(t)
                    })
                }
                <button onClick={handleRemoveUser}>Remove User</button>

            </div>
        </>
    )
})

export default UserComponent