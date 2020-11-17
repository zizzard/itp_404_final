import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

import "./App.css";

function Add() {
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [album, setAlbum] = useState("");
  const [artist, setArtist] = useState("");
  const [redirectURL, setRedirectURL] = useState("");

  const [titleError, setTitleError] = useState("");
  const [artistError, setArtistError] = useState("");
  const [albumError, setAlbumError] = useState("");
  const [lyricError, setLyricError] = useState("");

  useEffect(() => {
    document.title = `Add a song`;
  }, []);

  function add(e) {
    e.preventDefault();
    setLoaded(false);

    let valid = true;
    if (title === "") {
      setTitleError("Please provide a title for the song.");
      valid = false;
    }

    if (artist === "") {
      setArtistError("Please provide an artist for the song.");
      valid = false;
    }

    if (album === "") {
      setAlbumError("Please provide an album for the song.");
      valid = false;
    }

    if (lyrics === "") {
      setLyricError("Please provide a lyric description for the song.");
      valid = false;
    }

    if (!valid) return;

    setTitleError("");
    setArtistError("");
    setAlbumError("");
    setLyricError("");

    let data = {
      title: title,
      artist: artist,
      album: album,
      lyrics: lyrics,
    };

    fetch(`/api/song`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoaded(true);
        toast(`Successfully added the song: ${title}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(result);
        setRedirectURL(`/song/${result.id}`);
      });
  }
  if (redirectURL === "") {
    return (
      <div className="main-container">
        <h1>Add</h1>
        {loaded ? (
          <p>Song Added</p>
        ) : (
          <form className="flex-column">
            <label className="add-label" htmlFor="title">
              Title:
            </label>
            <input
              type="text"
              value={title}
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Song title..."
              className="add-field"
            />
            <div className="add-error">{titleError}</div>
            <label className="add-label" htmlFor="artist">
              Artist:
            </label>
            <input
              type="text"
              value={artist}
              id="artist"
              onChange={(e) => setArtist(e.target.value)}
              placeholder="Song album..."
              className="add-field"
            />
            <div className="add-error">{artistError}</div>
            <label className="add-label" htmlFor="album">
              Album:
            </label>
            <input
              type="text"
              value={album}
              id="album"
              onChange={(e) => setAlbum(e.target.value)}
              placeholder="Song album..."
              className="add-field"
            />
            <div className="add-error">{albumError}</div>
            <label className="add-label" htmlFor="lyrics">
              Lyrics (
              <a
                href="https://en.wikipedia.org/wiki/LRC_(file_format)"
                target="_blank"
                rel="noreferrer"
              >
                LRC Format
              </a>
              ):
            </label>
            <textarea
              value={lyrics}
              id="lyrics"
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="Song lyrics..."
              className="add-lyrics"
            />
            <div className="add-error">{lyricError}</div>
            <button onClick={add} className="add-button">
              Add
            </button>
          </form>
        )}
      </div>
    );
  } else {
    return <Redirect to={redirectURL} />;
  }
}

export default Add;
