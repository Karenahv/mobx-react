import {useStore} from "../../stores/helpers/use-store";
import UserComponent from "./UserComponent";
import {useState} from "react";
import {observer} from "mobx-react-lite";


const UsersList = observer(() => {
    const [nameUser, setNameUser] = useState('')
    const {dataStore: {userStore}} = useStore()

    const handleAddUser = ()=>{
        userStore.addUser(nameUser)
    }
    return <div>
        {
            userStore.collection.map(user=>{
                return <UserComponent key={user.id} user={user}></UserComponent>
            })
        }
        <input onChange={(e)=>setNameUser(e.target.value)}/>
        <button onClick={handleAddUser}>Add User</button>
    </div>
})

export default UsersList