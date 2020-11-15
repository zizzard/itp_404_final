import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./App.css";

function Song() {
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoaded(false);
    fetch(`http://localhost:8080/song/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoaded(true);
      });
  }, [id]);

  return (
    <div className="main-container">
      <h1>Song</h1>
      {loaded ? (
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
              <td>{data.title}</td>
            </tr>
            <tr>
              <td>Artist</td>
              <td>{data.artist}</td>
            </tr>
            <tr>
              <td>Album</td>
              <td>{data.album}</td>
            </tr>
            <tr>
              <td>Length</td>
              <td>{data.length}</td>
            </tr>
            <tr>
              <td>Lyrics</td>
              <td>{data.lyrics}</td>
            </tr>
            <tr>
              <td>ID</td>
              <td>{data.id}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Song;
