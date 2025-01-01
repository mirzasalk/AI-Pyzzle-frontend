// src/components/SimulationResult.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const SimulationResult = () => {
  const [currentState, setCurrentState] = useState(null);
  const [solutionSteps, setSolutionSteps] = useState(null);

  // Fetch current simulation state
  useEffect(() => {
    const fetchSimulationState = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/simulation-state/"
        );
        setCurrentState(response.data);
      } catch (error) {
        console.error("Error fetching simulation state:", error);
      }
    };

    fetchSimulationState();
  }, []);

  // Fetch solution steps
  const fetchSolution = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/solution/");
      setSolutionSteps(response.data.solution_steps);
    } catch (error) {
      console.error("Error fetching solution steps:", error);
    }
  };

  return (
    <div>
      <h2>Simulation Result</h2>

      {/* Current State */}
      {currentState ? (
        <div>
          <h3>Current State</h3>
          <p>Step: {currentState.step}</p>
          <p>Matrix: {currentState.current_state.join(", ")}</p>
        </div>
      ) : (
        <p>Loading current simulation state...</p>
      )}

      {/* Solution Steps */}
      <div>
        <h3>Solution</h3>
        <button onClick={fetchSolution}>Fetch Solution Steps</button>
        {solutionSteps && (
          <div>
            <p>Steps to Solve:</p>
            <p>{solutionSteps.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulationResult;
