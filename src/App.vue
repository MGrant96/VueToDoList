<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <v-toolbar-title>ToDo List</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <todo-form/>
      <todo-table />
    </v-main>
  </v-app>
</template>

<script>
import TodoForm from "./components/TodoForm.components.vue";
import TodoTable from "./components/TodoTable.components.vue";
import { mapState } from "vuex";

export default {
  name: "app",
  components: {
    TodoTable,
    TodoForm,
  },
  data() {
    return {
      firstname: "John",
      lastname: "Doe",
    };
  },
  methods: {
    addTodo(todo) {
      
    },
  },
  computed: {
    ...mapState({
      todos: (state) => state.todos,
    }),
  },
};
</script>

<style></style>
