import React from "react";
import "./App.css";

import { Link } from "react-router-dom";

function SongTable({ data }) {
  return (
    <div>
      {data.length !== 0 ? (
        <table>
          <thead>
            <tr>
              <th>Link To Karaoke</th>
              <th>Song Title</th>
              <th>Artist</th>
              <th>Album</th>
            </tr>
          </thead>
          <tbody>
            {data.map((song) => {
              return (
                <tr key={song.id}>
                  <td>
                    <Link
                      className="table-link"
                      to={`/song/${song.id}`}
                      exact={true}
                    >
                      Song Page
                    </Link>
                  </td>
                  <td>{song.title}</td>
                  <td>{song.artist}</td>
                  <td>{song.album}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No songs found</p>
      )}
    </div>
  );
}

export default SongTable;
