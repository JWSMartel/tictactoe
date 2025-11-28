import { Square } from "./App";
import { calculateWinner } from "./calculateWinner";

export function Board({ xIsNext, squares, onPlay, rows, cols, winLength }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares, rows, cols, winLength);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function createBoard() {
    return (
      <div>
        {Array.from({ length: rows }, (_, row) => (
          <div className="board-row" key={row}>
            {Array.from({ length: cols }, (_, col) => {
              const thisSq = row * cols + col;
              return (<Square key={thisSq} value={squares[thisSq]} onSquareClick={() => handleClick(thisSq)} />);
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
