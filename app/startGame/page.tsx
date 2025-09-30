"use client";
import { useState } from "react";

interface GameResponse {
  message: string;
  start_time: string;
  end_time: string;
}

function StartGame() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gameStatus, setGameStatus] = useState<string>("");
  const [gameData, setGameData] = useState<GameResponse | null>(null);
  const [error, setError] = useState<string>("");

  const handleStartGame = async () => {
    setIsLoading(true);
    setError("");
    setGameStatus("");
    
    try {
      const response = await fetch("/api/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GameResponse = await response.json();
      setGameData(data);
      setGameStatus("Game started successfully!");
      console.log("Game started:", data);
      
    } catch (error) {
      console.error("Error starting game:", error);
      setError("Failed to start the game. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style jsx>{`
        .start-game-container {
          font-family: sans-serif;
          padding: 40px;
          max-width: 800px;
          margin: auto;
          text-align: center;
        }
        .title {
          font-size: 2.5rem;
          margin-bottom: 30px;
          color: #333;
          font-weight: bold;
        }
        .start-button {
          padding: 15px 30px;
          font-size: 18px;
          cursor: pointer;
          border-radius: 8px;
          border: none;
          background-color: #4CAF50;
          color: white;
          transition: background-color 0.3s, transform 0.2s;
          margin: 20px 0;
        }
        .start-button:hover {
          background-color: #45a049;
          transform: translateY(-2px);
        }
        .start-button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
          transform: none;
        }
        .status-message {
          margin: 20px 0;
          padding: 15px;
          border-radius: 6px;
          font-size: 16px;
        }
        .success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        .error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
        .game-details {
          background-color: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          text-align: left;
        }
        .detail-row {
          margin: 10px 0;
          font-size: 14px;
        }
        .detail-label {
          font-weight: bold;
          color: #495057;
        }
        .detail-value {
          color: #6c757d;
          margin-left: 10px;
        }
        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: 10px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div className="start-game-container">
        <h1 className="title">Harry Potter Game</h1>
        
        <button 
          onClick={handleStartGame} 
          disabled={isLoading}
          className="start-button"
        >
          {isLoading && <span className="loading-spinner"></span>}
          {isLoading ? "Starting Game..." : "Start Game Round 1"}
        </button>

        {gameStatus && (
          <div className={`status-message success`}>
            {gameStatus}
          </div>
        )}

        {error && (
          <div className={`status-message error`}>
            {error}
          </div>
        )}

        {gameData && (
          <div className="game-details">
            <h3>Game Round Details:</h3>
            <div className="detail-row">
              <span className="detail-label">Message:</span>
              <span className="detail-value">{gameData.message}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Start Time:</span>
              <span className="detail-value">{new Date(gameData.start_time).toLocaleString()}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">End Time:</span>
              <span className="detail-value">{new Date(gameData.end_time).toLocaleString()}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Duration:</span>
              <span className="detail-value">1 minute</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default StartGame;