import {useState} from "react";
import {useStore} from "../../stores/helpers/use-store";
import {observer} from "mobx-react-lite";
import Modal from 'react-modal';
import TodoComponent from "./TodoComponent";


const TodoList = observer(() => {
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
            todoStore.addTodo(nameTodo, 999)

    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >

                <button onClick={closeModal}>close</button>
                <div>Add User</div>
                <form>
                    <label>Nombre de la tarea</label>
                    <input id='name-todo'/>
                    <button onClick={handleAddTodo}>Add Todo</button>

                </form>
                  </Modal>
                <div>
                    <h1>Todos Completed</h1>
                    <h3>{todoStore.completedTodos}</h3>
                    {todoStore.todoList.map((todo, idx) => {
                            if (todo.isCompleted === true) {
                                return <TodoComponent todo={todo}/>
                            }
                        }
                    )}
                </div>
                <div>
                    <h1>Incomplete Todos</h1>
                    <h3>{todoStore.incompleteTodos}</h3>
                    {todoStore.todoList.map((todo, idx) => {
                            if (todo.isCompleted === false) {
                                return <TodoComponent todo={todo}/>
                            }
                        }
                    )}

                </div>
                <button onClick={openModal}>Add Todo</button>
                <button>Remove Todo</button>
                <button>Edit Todo</button>
        </div>
)
})

export default TodoList