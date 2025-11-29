import { useState } from "react";
import { Board } from "./Board";

export default function Game() {
  const rows = 7;
  const cols = 6;
  const winLength = 4;
  const [history, setHistory] = useState([{squares:Array(rows*cols).fill(null),lastMove:null}]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isReversed, setIsReversed] = useState(false);
  const xIsNext = currentMove%2===0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares, clickedRow) {
    const nextHistory = [...history.slice(0,currentMove+1), {squares:nextSquares, lastMove:clickedRow}];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  function reverseList(){
    setIsReversed(!isReversed);
  }

  const moves = (isReversed?[...history].reverse():history).map((moveData, move) =>{
      let description;
      const displayMove = isReversed?history.length-1-move:move;

      if(displayMove>0){
        const {lastMove} = moveData;
        description = 'Go to move #'+displayMove+"  Made to ("+Math.floor(lastMove / cols)+","+lastMove % cols+")";
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
        <Board xIsNext={xIsNext} squares={currentSquares.squares} onPlay={handlePlay} rows={rows} cols={cols} winLength={winLength}/>
      </div>
      <div className="game-info">
        <button onClick={()=>reverseList()}>Reverse</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}