const express = require("express");
const path = require("path");
const fs = require(fs);

// Initialize our app variable by setting it to the value of express()
const app = express();
const PORT = 3001;

// middleware
// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "Develop/public")));

// links to db.json to add notes later on
const notes = require("./db/db.json");

// path to api notes and adds to notes
// res.json() allows us to return JSON instead of a buffer, string, or static file
app.get("/api/notes", (req, res) => {
  res.json(notes.slice(1));
});

// gets back notes.html when no query parameters is entered in url
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
});

// gets back index.html when invalid query paramter is entered
app.get("*", (req, res) =>{
  res.sendFile(path.join(__dirname, "./public/index.html"));
});