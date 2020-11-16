const { nanoid } = require("nanoid");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./server/db.json");
const db = low(adapter);

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// URL: localhost:8080/api/song
// Body:
// {
//     "title": "Nikes",
//     "artist": "Frank Ocean",
//     "album": "Blonde",
//     "lyrics": "testing the lyrics"
// }
app.post("/api/song", (req, res) => {
  let id = nanoid();
  let post = req.body;

  post.id = id;
  pushSong(post);

  res.send(getSongById(id));
});

// URL: localhost:8080/api/song/:id
app.get("/api/song/:id", (req, res) => {
  let id = req.params.id;

  let song = getSongById(id);

  res.send(song);
});

// URL: localhost:8080/api/delete/:id
app.delete("/api/song/:id", (req, res) => {
  let id = req.params.id;
  let resp = deleteSong(id);
  res.send({});
});

// URL: localhost:8080/api/songs
app.get("/api/songs", (req, res) => {
  let songs = getSongs();
  res.send(songs);
});

// URL: localhost:8080/api/search
// Body:
// {
//     "query": "search string"
// }
app.post("/api/search", (req, res) => {
  let query = req.body.query;

  let result = searchSongs(query);

  res.send(result);
});

// URL: localhost:8080/api/song/:id
// {
//     "title": "Nikes",
//     "artist": "Frank Ocean",
//     "album": "Blonde",
//     "lyrics": "testing the lyrics"
// }
app.patch("/api/song/:id", (req, res) => {
  let id = req.params.id;
  let changes = req.body;

  let response = editSong(id, changes);

  res.send(response);
});

function pushSong(song) {
  db.get("songs").push(song).write();
}

function deleteSong(id) {
  db.get("songs").remove({ id: id }).write();
  return db.get("songs").find({ id: id });
}

function getSongById(id) {
  return db.get("songs").find({ id: id });
}

function searchSongs(query) {
  let results = getSongs().filter((song) => {
    return (
      song.title.includes(query) ||
      song.artist.includes(query) ||
      song.album.includes(query) ||
      song.lyrics.includes(query) ||
      song.id.includes(query)
    );
  });
  return results;
}

function getSongs() {
  return db.get("songs");
}

function editSong(id, changes) {
  db.get("songs").find({ id: id }).assign(changes).write();
  return db.get("songs").find({ id: id });
}

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
