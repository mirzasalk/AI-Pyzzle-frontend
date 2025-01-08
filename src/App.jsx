// src/App.js
import React from "react";
import ImagePuzzle from "./components/UploadImage/UploadImage";
import RunSimulation from "./components/RunSimulation/RunSimulation";
import TileDisplay from "./components/TileDisplay/TileDisplay";
import { UploadImageProvider } from "./components/GlobalContexts/UploadImageContext";
import "./App.css";
import SimulationResult from "./components/SimulationResult";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "Space") {
          cilckk();
        }
      }}
      className="appMain"
    >
      <UploadImageProvider>
        <h1 className="titleP">Pyzzle</h1>
        <ImagePuzzle />
        <RunSimulation />
        <TileDisplay />
      </UploadImageProvider>
    </div>
  );
}

export default App;
