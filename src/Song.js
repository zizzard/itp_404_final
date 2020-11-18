import React, { useEffect, useState } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import Karaoke from "./Karaoke";
import Modal from "./Modal";
import "./App.css";

function Song() {
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [karaoke, setKaraoke] = useState(false);
  const [modalShown, setModalShown] = useState(false);

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [songID, setSongID] = useState("");
  const [redirectURL, setRedirectURL] = useState("");

  useEffect(() => {
    document.title = title + ", " + artist;
  }, [title, artist]);

  useEffect(() => {
    setLoaded(false);
    fetch(`/api/song/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setTitle(result.title);
        setArtist(result.artist);
        setAlbum(result.album);
        setLyrics(result.lyrics);
        setSongID(result.id);
        setLoaded(true);
      });
  }, [id]);

  function flipKaraoke() {
    setKaraoke(!karaoke);
  }

  function showModal() {
    setModalShown(true);
  }

  function hideModal() {
    setModalShown(false);
  }

  function deleteSong() {
    setModalShown(false);
    fetch(`/api/song/${songID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        toast(`Successfully deleted the song: ${title}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setRedirectURL("/");
      });
  }

  if (redirectURL === "") {
    return (
      <>
        {!karaoke ? (
          <>
            <div className="main-container">
              <h1>Song</h1>
              {loaded ? (
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>Key</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Title</td>
                        <td>{title}</td>
                      </tr>
                      <tr>
                        <td>Artist</td>
                        <td>{artist}</td>
                      </tr>
                      <tr>
                        <td>Album</td>
                        <td>{album}</td>
                      </tr>
                      <tr>
                        <td>Lyrics</td>
                        <td>{lyrics}</td>
                      </tr>
                      <tr>
                        <td>ID</td>
                        <td>{songID}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="song-buttons">
                    <button
                      className="button"
                      id="karaoke-on"
                      onClick={flipKaraoke}
                    >
                      Turn on karaoke
                    </button>
                    <button className="button" onClick={showModal}>
                      Delete Song
                    </button>
                    <Link className="link button" to={`/song/edit/${songID}`}>
                      <p id="edit">Edit Song</p>
                    </Link>
                  </div>
                </>
              ) : (
                <p id="loading">Loading...</p>
              )}
            </div>
            {modalShown && <Modal onClose={hideModal} onDelete={deleteSong} />}
          </>
        ) : (
          <>
            <Karaoke lrc={lyrics} />
            <div className="flex-center">
              <button className="button" id="karaoke-off" onClick={flipKaraoke}>
                Turn Off Karaoke
              </button>
            </div>
          </>
        )}
      </>
    );
  } else {
    return <Redirect to={redirectURL} />;
  }
}

export default Song;
