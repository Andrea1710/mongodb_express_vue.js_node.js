<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a href="/" class="navbar-brand">MEVN</a>
    </nav>

    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendTask">
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Insert New Task"
                    class="form-control"
                    v-model="task.title"
                  >
                </div>
                <div class="form-group">
                  <textarea
                    cols="30"
                    rows="10"
                    class="form-control"
                    placeholder="Insert a Description"
                    v-model="task.description"
                  ></textarea>
                </div>
                <template v-if="update === false">
                  <button class="btn btn-primary btn-block">Send</button>
                </template>
                <template v-else>
                  <button class="btn btn-primary btn-block">Update</button>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task of tasks" v-bind:key="task._id">
                <td>{{task.title}}</td>
                <td>{{task.description}}</td>
                <td>
                  <button @click="deleteTask(task._id)" class="btn btn-danger">Delete</button>
                  <button @click="updateTask(task._id)" class="btn btn-secondary">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

export default {
  data() {
    return {
      task: new Task(),
      tasks: [],
      update: false,
      taskToEdit: ""
    };
  },
  created() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      fetch("/api/tasks/")
        .then(res => res.json())
        .then(data => {
          this.tasks = data;
        });
    },
    sendTask() {
      if (this.update === false) {
        fetch("/api/tasks/", {
          method: "POST",
          body: JSON.stringify(this.task),
          headers: {
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getTasks();
          });
      } else {
        fetch("/api/tasks/" + this.taskToEdit, {
          method: "PUT",
          body: JSON.stringify(this.task),
          headers: {
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getTasks();
            this.update = false;
          });
      }

      this.task = new Task();
    },
    updateTask(id) {
      fetch("/api/tasks/" + id)
        .then(res => res.json())
        .then(data => {
          this.task = new Task(data.title, data.description);
          this.taskToEdit = data._id;
          this.update = true;
        });
    },
    deleteTask(id) {
      fetch("/api/tasks/" + id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.getTasks();
        });
    }
  }
};
</script>
