<template>
  <div id="todo-table" class="ma-5">
    <p v-if="todos.length < 1" class="empty-table">No Todos</p>
    <v-simple-table v-else>
      <thead>
        <tr>
          <th></th>
          <th>ToDo</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="todo in todos" :key="todo.id" class="list">
          <td>
            <v-checkbox color="primary" v-model="todo.completed" />
          </td>
          <td v-if="editing === todo.id">
            <input type="text" v-model="todo.title" />
          </td>
          <td class="todo-title" :class="{ completed: todo.completed }" v-else>
            {{ todo.title }}
          </td>

          <td v-if="editing === todo.id">
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
              @click="editMode(todo.id)"
            >
              <v-icon left>{{ icons.edit }}</v-icon>
              Edit
            </v-btn>

            <v-btn
              class="ma-1"
              color="error"
              @click="$store.dispatch('deleteTodo', todo.id)"
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

export default {
  name: "todo-table",
  computed: {
    todos() {
      return this.$store.state.todos;
    },
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
    editMode(id) {
      this.editing = id;
    },
    editTodo(todo) {
      if (todo.title === "") return;
      this.$store.dispatch("editTodo", { id: todo.id, updatedTodo: todo });
      this.editing = null;
    },
  },
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>

