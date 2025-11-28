import { useState } from "react";
import { Board } from "./Board";

export function Square({value, onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

export default function Game() {
  const rows = 5;
  const cols = 5;
  const winLength = 3;
  const [history, setHistory] = useState([Array(rows*cols).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove%2===0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0,currentMove+1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) =>{
    let description;
    if(move>0){
      description = 'Go to move #'+move;
    }else{
      description='go to game start';
    }

    return(
      <li key={move}>
        {move===currentMove?(<div>You are at move #{move}</div>):<button onClick={() => jumpTo(move)}>{description}</button>}
      </li>
    );
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} rows={rows} cols={cols} winLength={3}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}