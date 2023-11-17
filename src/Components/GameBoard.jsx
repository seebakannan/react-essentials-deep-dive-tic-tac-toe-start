export default function GameBoard({ gameBoard, onSquareClick }) {
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((col, colIndex) => {
              return (
                <li key={colIndex}>
                  <button
                    disabled={gameBoard[rowIndex][colIndex] !== null}
                    onClick={() => onSquareClick(rowIndex, colIndex)}
                  >
                    {" "}
                    {col}
                  </button>
                </li>
              );
            })}
          </ol>
        </li>
      ))}
    </ol>
  );
}
