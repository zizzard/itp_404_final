import React, { useCallback, useState, useRef, useEffect } from "react";
import { Lrc } from "@mebtte/react-lrc";
import "./App.css";

import { parseLrc } from "@mebtte/react-lrc";

function Karaoke({ lrc }) {
  const [timer, setTimer] = useState(0);
  const [timing, setTiming] = useState(false);
  const increment = useRef(null);

  useEffect(() => {
    return () => {
      handleReset();
    };
  }, []);

  const handleStart = () => {
    setTiming(true);
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 50);
    }, 50);
  };

  const handlePause = () => {
    setTiming(false);
    clearInterval(increment.current);
  };

  const handleReset = () => {
    clearInterval(increment.current);
    setTiming(false);
    setTimer(0);
  };

  const lineRenderer = useCallback(
    ({ lrcLine: { millisecond, content }, index, active }) => (
      <div style={{ textAlign: "center", color: active ? "green" : "inherit" }}>
        {content}
      </div>
    ),
    []
  );

  return (
    <>
      <div>
        <p>{timer}</p>
        <div className="buttons">
          {!timing ? (
            <button onClick={handleStart}>Start</button>
          ) : (
            <button onClick={handlePause}>Pause</button>
          )}
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
      <Lrc
        lrc={lrc}
        currentTime={timer}
        lineRenderer={lineRenderer}
        autoScroll={false}
      />
    </>
  );
}

export default Karaoke;
