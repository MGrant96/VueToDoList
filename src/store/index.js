import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const resource_uri = "http://localhost:8001/api/todo";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    },
    actions: {
        async getTodos({ commit }) {
            const response = await axios.get(resource_uri);
            console.log(response.data.result);
            commit('SET_TODOS', response.data.result);
        },
        async addTodo({ commit }, todo) {
            const response = await axios.post(resource_uri, todo);
            console.log(response);
            commit("ADD_TODO", response.data);
            // Call Todo to refresh the table
            this.dispatch('getTodos');
        },
        async deleteTodo({ commit }, id) {
            const response = await axios.delete(`${resource_uri}/${id}`);
            // Call Todo to refresh the table
            this.dispatch('getTodos');
            commit("DELETE_TODO", id);
        },
        async editTodo({ commit }, toUpdateTodo) {
            // Need to get the todo we are editing with _id, then the updated todo
            const response = await axios.put(`${resource_uri}/${toUpdateTodo._id}`, toUpdateTodo);
            commit("EDIT_TODO", toUpdateTodo);    
        },
    },

    mutations: {
        SET_TODOS(state, todos) {
            state.todos = todos
        },
        ADD_TODO(state, payload) {
            const lastId =
                state.todos.length > 0
                    ? state.todos[state.todos.length - 1].id
                    : 0;
            const id = lastId + 1;
            const newTodo = {...payload, id};
            state.todos = [...state.todos, newTodo];
        },
        EDIT_TODO(state, toUpdateTodo) {
            console.log(state.todos);
            state.todos = state.todos.map(todo =>
                todo._id === toUpdateTodo._id ? toUpdateTodo : todo
            )
        },
        DELETE_TODO(state, id) {
            state.todos = state.todos.filter(
                todo => todo.id !== id
            )
        }
    },
    modules: {}
})
