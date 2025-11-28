import { useState } from "react";
import { Board } from "./Board";

export default function Game() {
  const rows = 3;
  const cols = 3;
  const winLength = 3;
  const [history, setHistory] = useState([Array(rows*cols).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isReversed, setIsReversed] = useState(false);
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

  function reverseList(){
    setIsReversed(!isReversed);
  }

  const moves = (isReversed?[...history].reverse():history).map((squares, move) =>{
      let description;
      const displayMove = isReversed?history.length-1-move:move;
      if(displayMove>0){
        description = 'Go to move #'+displayMove;
      }else{
        description='go to game start';
      }

      return(
       <li key={displayMove}>
         {displayMove===currentMove?(<div>You are at move #{displayMove}</div>):<button onClick={() => jumpTo(displayMove)}>{description}</button>}
       </li>
      );
    })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} rows={rows} cols={cols} winLength={3}/>
      </div>
      <div className="game-info">
        <button onClick={()=>reverseList()}>Reverse</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}