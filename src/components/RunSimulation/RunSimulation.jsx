import React, { useEffect, useState } from "react";
import axios from "axios";
import "./runSimulation.css";
import { UploadImageContext } from "../GlobalContexts/uploadImageContext";
import { useContext } from "react";

const RunSimulation = () => {
  const {
    matrixSize,
    showAlgoritamHeuristikaMenu,
    setShowAlgoritamHeuristikaMenu,
    setPocetnoStanje,
    koraci,
    setKoraci,
    konacnoStanje,
    setKonacnoStanje,
  } = useContext(UploadImageContext);
  const [algorithm, setAlgorithm] = useState("a_star");
  const [heuristic, setHeuristic] = useState("manhattan");
  const [simulationResult, setSimulationResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(""); // Resetovanje grešaka

    const data = { algorithm, heuristic, size: matrixSize };
    console.log(data);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/run-simulation/",
        data
      );
      console.log(response.data);
      setSimulationResult(response.data);

      setPocetnoStanje(response.data.initial_state);
      setKonacnoStanje(response.data.goal_state);
      setKoraci(response.data.steps);
      setShowAlgoritamHeuristikaMenu(false);
    } catch (error) {
      setError(
        error.response?.data?.error ||
          "An error occurred while running the simulation"
      );
    }
  };

  return (
    <div className="helperDiv">
      {showAlgoritamHeuristikaMenu == true ? (
        <div className="runSimulationMain">
          <h2>Izaberi algoritam i heuristiku</h2>
          <form className="formRun" onSubmit={handleSubmit}>
            <div className="formMenu">
              <div>
                <label>Algorithm:</label>

                <select
                  value={algorithm}
                  onChange={(e) => setAlgorithm(e.target.value)}
                >
                  <option value="breadth_first_search">
                    Breadth First Search
                  </option>
                  <option value="a_star">A* Algorithm</option>
                  <option value="greedy_best_first_search">
                    Greedy Best-First Search
                  </option>{" "}
                  {/* Nova opcija */}
                </select>
              </div>
              <div>
                <label>Heuristic:</label>
                <select
                  value={heuristic}
                  onChange={(e) => setHeuristic(e.target.value)}
                  disabled={algorithm === "breadth_first_search"} // Onemogućava heuristiku za BFS
                >
                  <option value="manhattan">Manhattan</option>
                  <option value="hamming">Hamming</option>
                </select>
              </div>
            </div>
            <button type="submit">Izaberi algoritam i heuristiku</button>
          </form>

          {/* Prikaz grešaka */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Prikaz rezultata simulacije */}
        </div>
      ) : null}
    </div>
  );
};

export default RunSimulation;
