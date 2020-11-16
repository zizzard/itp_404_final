import React, { useEffect, useState } from "react";
import SongTable from "./SongTable";
import "./App.css";

function Songs() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    document.title = `Browse Songs`;
  }, []);

  useEffect(() => {
    setLoaded(false);
    fetch(`/api/songs`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
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
