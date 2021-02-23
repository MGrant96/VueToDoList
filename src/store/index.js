import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [
      {
        id:1,
        title: 'Take out the bins.',
        completed: false,
      },
      {
        id: 2,
        title: 'Go for a run.',
        completed: false,
      }
    ],
    
},
mutations: {
    ADD_TODO(state, payload) {
        const lastId =
            state.todos.length > 0
                ? state.todos[state.todos.length - 1].id
                : 0;
        const id = lastId + 1;
        const newTodo = {...payload, id};
        state.todos = [...state.todos, newTodo];
    },
    EDIT_TODO(state, {id, updatedTodo}) {
        state.todos = state.todos.map(todo =>
            todo.id === id ? updatedTodo : todo
        )
    },
    DELETE_TODO(state, id) {
        state.todos = state.todos.filter(
            todo => todo.id !== id
        )
    }
},
actions: {
    addTodo({commit}, todo) {
        commit("ADD_TODO", todo);
    },
    deleteTodo({commit}, id) {
        commit("DELETE_TODO", id);
    },
    editTodo({commit}, toUpdateTodo) {
        commit("EDIT_TODO", toUpdateTodo);
    }
},
modules: {}
})
