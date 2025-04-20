import { Todo } from '../todos/models/todo.model';

export const Filters = {
  All: 'all',
  Completed: 'completed',
  Pending: 'pending'
}

const state = {
  todos: [
    new Todo('Piedra del alma'),
    new Todo('Piedra del infinito'),
    new Todo('Piedra del tiempo'),
    new Todo('Piedra del poder'),
    new Todo('Piedra de la realidad'),
  ],
  filter: Filters.All
}

const initStore = () => {
  loadStore();
  console.log('initStore: 🥑 ');
}

const loadStore = () => {

  if(!localStorage.getItem('state')) return;
  const {todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));
  state.todos = todos;
  state.filter = filter;
}


const saveStateToLocalStore = () => {
  localStorage.setItem('state', JSON.stringify(state));
}

const getTodos = (filter = Filters.All) => {

  switch (filter) {
    case Filters.All:
      return [...state.todos];
    case Filters.Completed:
      return state.todos.filter(todo => todo.done);
    case Filters.Pending:
      return state.todos.filter(todo => !todo.done);
    default:
      throw new Error(`Opción ${filter} is not valid.`);
  }

}

/**
 *
 * @param {String} description
 */
const addTodo = (description) => {

  if (!description) throw Error('Description is required');
  state.todos.push(new Todo(description));

  saveStateToLocalStore();

}

/**
 *
 * @param {Boolean} todoId
 */
const toggleTodo = (todoId) => {


  state.todos = state.todos.map(todo => {
    if (todo.id === todoId) {
      todo.done = !todo.done;
    }
    return todo;
  });
  saveStateToLocalStore();
}

/**
 *
 * @param {String} todoId
 */
const deleteTodo = (todoId) => {

  state.todos = state.todos.filter(todo => todo.id !== todoId);
  saveStateToLocalStore();
}

/**
 *
 * @param {} todoId
*/
const deleteCompleted = () => {

  state.todos = state.todos.filter(todo => !todo.done);
  saveStateToLocalStore();
}

/**
 *
 * @param {Filters} newfilter
 */
const setFilter = (newfilter = Filters.All) => {

  state.filter = newfilter;
  saveStateToLocalStore();
}

const getCurrentFilter = () => {
  return state.filter;
}

export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
}