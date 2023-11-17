import Player from "./Components/Player.jsx";
import { useState } from "react";
import GameBoard from "./Components/GameBoard";
import GameOver from "./Components/GameOver.jsx";
import Log from "./Components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning_combinations.js";
const GAME_BOXES = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function getCurrentPlayer(turns) {
  let playerCurrent = "X";
  if (turns.length && turns[0].player === "X") {
    playerCurrent = "O";
  }
  return playerCurrent;
}

function App() {
  const [users, setUsers] = useState({
    X: "Player 1",
    O: "player 2",
  });
  const [turns, setTurns] = useState([]);
  const currentPlayer = getCurrentPlayer(turns);
  const gameBoard = [...GAME_BOXES.map((innerArray) => [...innerArray])];

  for (const turn of turns) {
    const {
      square: { row, col },
      player,
    } = turn;
    gameBoard[row][col] = player;
  }

  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = users[firstSquare];
    }
  }

  const draw = turns.length === 9 && !winner;

  function handleClick(rowIndex, colIndex) {
    setTurns((previousTurns) => {
      const playerCurrent = getCurrentPlayer(previousTurns);
      const updatedSquare = [
        { square: { row: rowIndex, col: colIndex }, player: playerCurrent },
        ...previousTurns,
      ];

      return updatedSquare;
    });
  }

  function handleUserNameSave(symbol, newvalue) {
    setUsers((previousUsers) => ({
      ...previousUsers,
      [symbol]: newvalue,
    }));
  }

  function rematch() {
    setTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            handleUserNameSave={handleUserNameSave}
            name="player 1"
            symbol="X"
            isActive={currentPlayer === "X"}
          />
          <Player
            handleUserNameSave={handleUserNameSave}
            name="player 2"
            symbol="O"
            isActive={currentPlayer === "O"}
          />
        </ol>
      </div>
      {winner || draw ? (
        <GameOver winner={winner} rematch={rematch} />
      ) : (
        <>
          <GameBoard onSquareClick={handleClick} gameBoard={gameBoard} />
          <Log turns={turns} />
        </>
      )}
    </main>
  );
}

export default App;
