import React from "react";
import { useState } from "react";

export default function Player({ handleUserNameSave, name, symbol, isActive }) {
  const [isEdit, setIsEdit] = useState(false);
  const [userName, setUserName] = useState(name);

  function handleSave(symbol) {
    setIsEdit((editState) => !editState);
    if (isEdit) {
      handleUserNameSave(symbol, userName);
    }
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEdit ? (
          <span className="player-name">{userName}</span>
        ) : (
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={(e) => handleSave(symbol)}>
        {isEdit ? "save" : "Edit"}
      </button>
    </li>
  );
}
