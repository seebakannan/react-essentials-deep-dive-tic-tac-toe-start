export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((data, index) => (
        <li key={index}>
          Player {data.player} selected {data.square.row}, {data.square.col}
        </li>
      ))}
    </ol>
  );
}
