const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectToDatabase = require("./database/mongodb");

const postController = require("./controllers/post");
const authorController = require("./controllers/author");
const tagController = require("./controllers/tag");

//App Config
const app = express();
const port = process.env.PORT || 8085;
const corsOptions = {
  origin: [process.env.BASE_ORIGIN, process.env.VIEW_ORIGIN],
};

//Middleware
app.use(bodyParser.json());

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DB Config
connectToDatabase();

//API Endpoints
app.use("/post", postController);
app.use("/author", authorController);
app.use("/tag", tagController);
app.get("/", (req, res) => res.send("Hi there!"));

//Listener
app.listen(port, () => {
  console.log(`Listening on localhost: ${port}`);
});
