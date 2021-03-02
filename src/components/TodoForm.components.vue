<template>
  <div id="todo-form" class="pt-3 ma-5">
    <form @submit.prevent="handleSubmit">
      <label>ToDo Title</label>
      <v-text-field
        ref="first"
        type="text"
        :class="{ 'has-error': submitting && invalidTitle }"
        v-model="todo.title"
        @focus="clearStatus"
        @keypress="clearStatus"
      />
      <p v-if="error && submitting" class="error-message">
        ❗Please fill out ToDo field!
      </p>
      <p v-if="success" class="success-message">✅ Todo successfully added</p>
      <v-btn type="submit" onClick="window.location.reload();">Add ToDo</v-btn>
    </form>
  </div>
</template>
 
<script>
export default {
  name: "todo-form",
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      todo: {
        title: "",
        completed: false,
      },
    };
  },
  methods: {
    handleSubmit() {
      this.submitting = true;
      this.clearStatus();

      if (this.invalidTitle) {
        this.error = true;
        return;
      }
      this.$store.dispatch("addTodo", this.todo);
      this.$refs.first.focus();
      this.todo = {
        title: "",
        completed: "",
      };
      this.error = false;
      this.success = true;
      this.submitting = false;
    },
    clearStatus() {
      this.success = false;
      this.error = false;
    },
  },
  computed: {
    invalidTitle() {
      return this.todo.title === "";
    },
  },
};
</script>

<style scoped>
form {
  margin-bottom: 2rem;
}

[class*="-message"] {
  font-weight: 500;
}

.error-message {
  color: #d33c40;
}

.success-message {
  color: #32a95d;
}
</style>
