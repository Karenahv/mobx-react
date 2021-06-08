import React from 'react';
import './App.css';
import {useStore} from "./stores/helpers/use-store";
import TodoList from "./components/todosList/TodoList";
import {Views} from "./stores/ui/global-view";
import UsersList from "./components/usersList/UsersList";
import {observer} from "mobx-react-lite";

function App() {
    const {dataStore: {todoStore}, uiStore:{globalView}} = useStore()
    const getCurrentView = ()=>{
        if(globalView.currentView === Views.Todos ){
            return <TodoList></TodoList>
        }

        if(globalView.currentView === Views.Users ){
            return <UsersList></UsersList>
        }

        return null
    }
  return (
    <div className="App">
        <nav className="navbar navbar-dark bg-dark">
                <div style={{flexDirection: 'row'}} className="navbar-nav">
                    <span className={`nav-item ${globalView.currentView === Views.Todos ? 'active' : null}`}>
                        <a className="nav-link" onClick={() => globalView.updateView(Views.Todos)} href="#">{`${Views.Todos}`} View</a>
                    </span>
                    <span style={{marginLeft: '15px'}} className={`nav-item ${globalView.currentView === Views.Users ? 'active' : null}`}>
                        <a className="nav-link" onClick={() => globalView.updateView(Views.Users)} href="#">{`${Views.Users}`} View</a>
                    </span>
                </div>
            </nav>
        {getCurrentView()}
    </div>
  );
}

export default observer(App);
