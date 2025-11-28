import { useEffect, useState } from "react";
import { calculateWinner } from "./calculateWinner";

function Square({value, onSquareClick, isWinningSquare}) {
  return <button className={`square ${isWinningSquare ? "highlight" : ""}`} onClick={onSquareClick}>{value}</button>
}

export function Board({ xIsNext, squares, onPlay, rows, cols, winLength }) {
  const [winningSquares, setWinningSquares] = useState([]);

  function handleClick(i) {
    if (winningSquares.length>0 || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  useEffect(()=>{
    const winnerLine = calculateWinner(squares, rows, cols, winLength);
    if (winnerLine) {
      setWinningSquares(winnerLine);
    }
  }, [squares,rows,cols,winLength]);

  const isBoardFull = squares.every((square) => square !== null&&square !== "");

  const winnerLine = calculateWinner(squares, rows, cols, winLength);
  let status = winnerLine ? "Winner: " + (!xIsNext ? "X" : "O") 
             : isBoardFull ? "The game is a draw" 
             : "Next player: " + (xIsNext ? "X" : "O");

  function createBoard() {
    return (
      <div>
        {Array.from({ length: rows }, (_, row) => (
          <div className="board-row" key={row}>
            {Array.from({ length: cols }, (_, col) => {
              const thisSq = row * cols + col;
              return (<Square key={thisSq} value={squares[thisSq]} onSquareClick={() => handleClick(thisSq)} isWinningSquare={winningSquares.includes(thisSq)}/>);
            })}
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {createBoard()}
    </>
  );
}
