<template>
  <div id="todo-table" class="ma-5">
    <p v-if="todos && todos.length < 1" class="empty-table">No Todos</p>
    <v-simple-table v-else>
      <thead>
        <tr>
          <th></th>
          <th>ToDo</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="todo in todos" :key="todo._id" class="list">
          <td>
            <v-checkbox color="primary" v-model="todo.completed" />
          </td>
          <td v-if="editing === todo._id">
            <input type="text" v-model="todo.title" />
          </td>
          <td class="todo-title" :class="{ completed: todo.completed }" v-else>
            {{ todo.title }}
          </td>
 
          <td v-if="editing === todo._id">
            <v-btn class="ma-1" color="success" @click="editTodo(todo)">
              <v-icon left>{{ icons.save }}</v-icon>
              Save
            </v-btn>

            <v-btn class="ma-1" color="info" @click="editing = null">
              <v-icon left>{{ icons.cancel }}</v-icon>
              Cancel
            </v-btn>
          </td>

          <td v-else>
            <v-btn
              class="ma-1"
              color="warning"
              @click="editMode(todo._id)"
            >
              <v-icon left>{{ icons.edit }}</v-icon>
              Edit
            </v-btn>

            <v-btn
              class="ma-1"
              color="error"
              @click="deleteTodo(todo._id)"

            >
              <v-icon left>{{ icons.delete }}</v-icon>
              Delete
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import {
  mdiPen,
  mdiDelete,
  mdiCancel,
  mdiContentSaveEdit,
  mdiPlus,
} from "@mdi/js";

import { mapState, mapActions } from 'vuex';

export default {
  name: "todo-table",
  computed: {
    ...mapState({
      todos: state => state.todos
    })
  },
  created() {
    this.getTodos()
  },
  data() {
    return {
      editing: null,
      icons: {
        edit: mdiPen,
        delete: mdiDelete,
        save: mdiContentSaveEdit,
        cancel: mdiCancel,
        add: mdiPlus,
      },
    };
  },
  methods: {
    ...mapActions(['getTodos', 'deleteTodo']),
    editMode(_id) {
      this.editing = _id;
    },
    editTodo(todo) {
      if (todo.title === "") return;
      this.$store.dispatch("editTodo", todo);
      this.editing = null;
    },
    
  }
}
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>

