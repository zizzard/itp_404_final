import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

import "./App.css";

function EditSong() {
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);

  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [songID, setSongID] = useState("");

  useEffect(() => {
    document.title = `Edit song`;
  }, []);

  useEffect(() => {
    setLoaded(false);
    fetch(`http://localhost:8080/song/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setTitle(result.title);
        setArtist(result.artist);
        setAlbum(result.album);
        setLyrics(result.lyrics);
        setSongID(result.id);
        setLoaded(true);
      });
  }, [id]);

  function updateSong(e) {
    e.preventDefault();

    let obj = {};

    if (data.title !== title) {
      obj.title = title;
    }

    if (data.artist !== artist) {
      obj.artist = artist;
    }

    if (data.album !== album) {
      obj.album = album;
    }
    if (data.lyrics !== lyrics) {
      obj.lyrics = lyrics;
    }

    console.log(obj);

    fetch(`http://localhost:8080/song/${songID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }

  return (
    <div className="main-container">
      <h1>Song</h1>
      {loaded ? (
        <>
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
            <textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="Song lyrics..."
              className="add-lyrics"
            />
            <button onClick={updateSong}>Update Song</button>
          </form>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EditSong;
