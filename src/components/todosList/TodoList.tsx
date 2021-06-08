import {FunctionComponent, useState} from "react";
import {useStore} from "../../stores/helpers/use-store";
import {observer} from "mobx-react-lite";
import Modal from 'react-modal';
import TodoComponent from "./TodoComponent";
import User from "../../stores/data/user";

interface Props {
    user?: User;
}

const TodoList: FunctionComponent<Props>  = observer(({user}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const {dataStore: {todoStore}} = useStore()

     function openModal() {
    setModalIsOpen(true);
  }
    function closeModal() {
        setModalIsOpen(false);
    }

    function handleAddTodo(){
        const nameTodo = (document.getElementById('name-todo') as HTMLInputElement).value;
            todoStore.addTodo(nameTodo, user? user.id: 999)

    }
    const completedTodos = user ? user.completedTodos : todoStore.completedTodos
    const incompletedTodos = user ? user.incompleteTodos : todoStore.incompleteTodos
    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >

                <button onClick={closeModal}>close</button>
                <div>Add Todo</div>
                <form>
                    <label>Nombre de la tarea</label>
                    <input id='name-todo' />
                    <button onClick={handleAddTodo}>Add Todo</button>

                </form>
                  </Modal>
                <div>
                    <h1>Todos Completed</h1>
                    <h3>{completedTodos.length}</h3>
                    {completedTodos.map((todo, idx) => {
                                return <TodoComponent key={todo.id} todo={todo}/>
                        }
                    )}
                </div>
                <div>
                    <h1>Incomplete Todos</h1>
                    <h3>{incompletedTodos.length}</h3>
                    {incompletedTodos.map((todo, idx) => {
                                return <TodoComponent key={todo.id} todo={todo}/>
                        }
                    )}

                </div>
                <button onClick={openModal}>Add Todo</button>

        </div>
)
})

export default TodoList