import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

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
  const [redirectURL, setRedirectURL] = useState("");

  useEffect(() => {
    document.title = `Edit song`;
  }, []);

  useEffect(() => {
    setLoaded(false);
    fetch(`/api/song/${id}`)
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

    fetch(`/api/song/${songID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((result) => {
        toast(`Successfully updated the song: ${result.title}`, {
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
        <h1>Song</h1>
        {loaded ? (
          <>
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
              <button onClick={updateSong}>Update Song</button>
            </form>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  } else {
    return <Redirect to={redirectURL} />;
  }
}

export default EditSong;
