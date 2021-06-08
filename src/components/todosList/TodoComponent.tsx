import React, {FunctionComponent, useState} from 'react'
import Todo from "../../stores/data/Todo";
import {useStore} from "../../stores/helpers/use-store";
import Modal from "react-modal";
import {observer} from "mobx-react-lite";

interface Props {
    todo: Todo
}

const TodoComponent: FunctionComponent<Props> = observer(({todo}) => {
    const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false)
    const {dataStore: {todoStore}} = useStore()

    const handleRemove = () =>{
        todoStore.removeTodo(todo.name)
    }

    const handleEdit = () => {
        const nameTodo = (document.getElementById('name-todo') as HTMLInputElement).value;
        debugger;
        todoStore.editTodo(nameTodo, todo.name)
        //todo.updateName(nameTodo)
    }

    const handleToogle = ()=>{
        todo.toggleTodo()
    }

     function openModal() {
    setModalIsOpenEdit(true);
  }
    function closeModal() {
        setModalIsOpenEdit(false);
    }
    return (
        <>
            <Modal
                isOpen={modalIsOpenEdit}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >

                <button onClick={closeModal}>close</button>
                <div>Edit Todo</div>
                <form>
                    <label>Nombre de la tarea</label>
                    <input id='name-todo' defaultValue={todo.name}/>
                    <button onClick={handleEdit}>Edit Todo</button>

                </form>
                  </Modal>
            <li>
                Name: {todo.name}, userId {todo.userId}
            </li>
            <button onClick={handleRemove}>Remove Todo</button>
            <button onClick={openModal}>Edit Todo</button>
            <button onClick={handleToogle}>Complete Todo</button>
        </>
    )
})

export default TodoComponent