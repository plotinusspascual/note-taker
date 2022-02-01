const express = require("express");
const path = require("path");
const fs = require("fs");

// Initialize our app variable by setting it to the value of express()
const app = express();
// listens to server port or if no server use localhost 3001
const PORT = process.env.PORT || 3001;

// middleware
// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "Develop/public")));

// links to db.json to add notes later on
const notes = require("./Develop/db/db.json");

// path to api notes and adds to notes
// res.json() allows us to return JSON instead of a buffer, string, or static file
app.get("/api/notes", (req, res) => {
  res.json(notes.slice(1));
});

// gets back index.html when no query parameters is entered in url
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
});

// gets back notes.html when query paramter is entered
app.get("*", (req, res) =>{
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

// create function to get user input in notes and save it in db.json
function getNotes(body, notesArray) {
  const newNote = body;
  if (!Array.isArray(notesArray))
      notesArray = [];
  
  if (notesArray.length === 0)
      notesArray.push(0);

  body.id = notesArray[0];
  notesArray[0]++;

  notesArray.push(newNote);
  fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify(notesArray, null, 2)
  );
  return newNote;
}
// make a post function to post saved json
app.post("/api/notes", (req,res) =>{
  const newNote = getNotes(req.body, notes);
  res.json(newNote);
});

// hosts js in port
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
