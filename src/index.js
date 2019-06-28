const express = require("express");
const app = express();
const morgan = require("morgan");

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes

// Static files

app.use(express.static(__dirname + "/public"));

// Server started
app.listen(app.get("port"), () => {
  console.log(`Server is listening on port ${app.get("port")}`);
});
