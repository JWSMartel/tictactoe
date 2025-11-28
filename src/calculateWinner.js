export function calculateWinner(squares, rows, cols, winLength) {
  function checkLine(start, delta){
    //first is our starting square
    const first=squares[start];
    //if first is empty return early
    if(!first){return null};

    for(let i=1;i<winLength;i++){
      const next=start+delta*i;
      //if the next square isn't the same as the first square return early
      if(squares[next]!==first){return null;}

      //Stop check from wrapping around
      if(delta===1&&Math.floor(next/cols)!==Math.floor(start/cols)){return null;}
    }
    return first;
  }

  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      const thisSq=r*cols+c;
      if(!squares[thisSq]){continue;}

      //horizontal check
      if(c+winLength<=cols){
        const winner = checkLine(thisSq,1);
        if(winner){return winner;}
      }

      // vertical check
      if (r + winLength <= rows) {
        const winner = checkLine(thisSq, cols);
        if (winner) return winner;
      }

      // diagonal right check
      if (c + winLength <= cols && r + winLength <= rows) {
        const winner = checkLine(thisSq, cols + 1);
        if (winner) return winner;
      }

      // diagonal left check
      if (c - winLength + 1 >= 0 && r + winLength <= rows) {
        const winner = checkLine(thisSq, cols - 1);
        if (winner) return winner;
      }
    }
  }
}
