"use client"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useMemo, useState } from "react";
import Cell from "./components/Cell";



export default function Home() {

  const [cells, setCells]= useState(["", "", "","", "", "","", "", ""])
  const [go, setGo]= useState("circle")
  const [circleWinsCount, setCircleWinsCount] = useState(0);
  const [crossWinsCount, setCrossWinsCount] = useState(0);
  const [tiesCount, setTiesCount] = useState(0);
  const [winner, setWinner] = useState<null | "circle" | "cross">(null);
 
  const newGame= ()=>{
    setCircleWinsCount(0)
    setCrossWinsCount(0)
    setTiesCount(0)
    setCells(["", "", "","", "", "","", "", ""])
    setGo("circle")
    setWinner(null)
  }

  const resetBoard=()=>{
    setCells(["", "", "","", "", "","", "", ""])
    setGo("circle")
    setWinner(null)
  }

  const winningCombos = useMemo(() => [
   [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
  
], []);


 

  useEffect(() => {
  let winnerFound = false;

  winningCombos.forEach((combo) => {
    const circleWins = combo.every((index) => cells[index] === "circle");
    const crossWins = combo.every((index) => cells[index] === "cross");

    if (circleWins) {
      setCircleWinsCount((prev) => prev + 1);
      setWinner("circle")
      winnerFound = true;
    } else if (crossWins) {
      setCrossWinsCount((prev) => prev + 1);
      winnerFound = true;
      setWinner("cross")
    }
  });

  // Tie check OUTSIDE the forEach
  if (!winnerFound && cells.every((cell) => cell !== "")) {
    setTiesCount((prev) => prev + 1);
  }
}, [cells, winningCombos]);


  console.log(cells)
  return (

  <main className="container">
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <div className="game-card">

          <div className="text-center mb-2">
            <div className="header-title">Tic-Tac-Toe</div>
            <div className="subtitle">A tiny cute board — implement the logic later</div>
          </div>

          {/* <!-- Turn / Status --> */}
          <div className="d-flex align-items-center justify-content-between">
            <div className="text-start">
              <div className="small text-muted">Turn</div>
              <div className="h6 mb-0">Player <strong>{go}</strong></div>
            </div>
            <div className="text-end">
              <div className="small text-muted">Mode</div>
              <div className="h6 mb-0">2 Players</div>
            </div>
          </div>

          {/* <!-- Board --> */}
          <div className="board" role="grid" aria-label="Tic Tac Toe board">
            {/* <!-- Each tile is a button (accessible) with data-cell attribute to attach JS later --> */}
            {cells.map((cell, index)=>(
              <Cell id={index} go={go} setGo={setGo} key={index} cells={cells} setCells={setCells}
              cell={cell}
              winner={winner}
              ></Cell>
            ))}
          </div>

          {/* <!-- Scoreboard --> */}
          <div className="score" aria-hidden="false">
            <div className="pill">
              <span className="fw-bold">X</span>
              <span className="badge bg-white text-dark ms-1">{crossWinsCount}</span>
            </div>
            <div className="pill">
              <span className="fw-bold">Tie</span>
              <span className="badge bg-white text-dark ms-1">{tiesCount}</span>
            </div>
            <div className="pill">
              <span className="fw-bold">O</span>
              <span className="badge bg-white text-dark ms-1">{circleWinsCount}</span>
            </div>
          </div>

          {/* <!-- Controls --> */}
          <div className="controls">
            <button className="btn btn-reset px-3 py-2" onClick={resetBoard}>Reset Board</button>
            <button className="btn btn-primary-ghost px-3 py-2" onClick={newGame}>New Game</button>
          </div>

          {/* <!-- Footer small --> */}
          <div className="text-center mt-3">
            <small className="text-muted">Tip: click a cell to place X or O </small>
          </div>

        </div>
      </div>
    </div>
  </main>
 
  );
}
