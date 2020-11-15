import React, { useEffect, useState } from "react";
import SongTable from "./SongTable";
import "./App.css";

function Songs() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoaded(false);
    fetch(`http://localhost:8080/songs`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoaded(true);
      });
  }, []);

  return (
    <div className="main-container">
      <h1>Songs</h1>
      {loaded ? <SongTable data={data} /> : <p>Loading...</p>}
    </div>
  );
}

export default Songs;
