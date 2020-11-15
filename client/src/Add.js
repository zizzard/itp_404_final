import React, { useEffect, useState } from "react";

import "./App.css";

function Add() {
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [album, setAlbum] = useState("");
  const [artist, setArtist] = useState("");
  const [length, setLength] = useState("");

  useEffect(() => {
    document.title = `Add a song`;
  }, []);

  function add() {
    setLoaded(false);
    let data = {
      title: title,
      artist: artist,
      album: album,
      length: length,
      lyrics: lyrics,
    };

    fetch(`http://localhost:8080/song`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoaded(true);
      });
  }

  return (
    <div className="main-container">
      <h1>Add</h1>
      {loaded ? (
        <p>Song Added</p>
      ) : (
        <form>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Song title..."
            className="add-field"
          />
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Song album..."
            className="add-field"
          />
          <input
            type="text"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            placeholder="Song album..."
            className="add-field"
          />
          <input
            type="text"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder="Song length (seconds)..."
            className="add-field"
          />
          <textarea
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            placeholder="Song lyrics..."
            className="add-lyrics"
          />
          <button onClick={add} className="add-button">
            Add
          </button>
        </form>
      )}
    </div>
  );
}

export default Add;
