import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import './test'
import './test2'
import RootStore from "./stores/root-store";
//import './example2'
import './exercise1'

const rootStore = new RootStore()


console.log('rootStore', rootStore)

// create 4 users
rootStore.dataStore.userStore.addUser('Georgy');
rootStore.dataStore.userStore.addUser('Student 1');
rootStore.dataStore.userStore.addUser('Student 2');
rootStore.dataStore.userStore.addUser('Student 3');

//lets take the user so we can do actions on him
const newUser = rootStore.dataStore.userStore.getUser('Georgy')

//lests add some todos to the user
rootStore.dataStore.todoStore.addTodo('FInish the exercise', newUser.id)
rootStore.dataStore.todoStore.addTodo('Learn Mobx', newUser.id)

// now we remove him
rootStore.dataStore.userStore.removeUser('Georgy')


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
