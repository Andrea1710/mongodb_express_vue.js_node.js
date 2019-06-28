const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

// Initializations
const app = express();
mongoose
  .connect("mongodb://localhost/mevn-database")
  .then(db => console.log("DB is connected"))
  .catch(err => console.log(err));

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/tasks", require("./routes/tasks"));

// Static files

app.use(express.static(__dirname + "/public"));

// Server started
app.listen(app.get("port"), () => {
  console.log(`Server is listening on port ${app.get("port")}`);
});
