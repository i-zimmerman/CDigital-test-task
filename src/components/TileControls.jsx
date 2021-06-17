import React, { useEffect, useState } from "react";

const TileControls = ({ currentTiles, onSubmit }) => {
  const [tiles, setTiles] = useState(currentTiles);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    setError(false);

    if (tiles % 2 !== 0 || tiles <= 0 || tiles > 30) {
      setError(true);
      return;
    }

    onSubmit(tiles);
  };

  return (
    <div>
      <h3>Create your own tile table</h3>
      <p>*amount of tiles should not be odd</p>
      <input
        type="number"
        value={tiles}
        onChange={(e) => setTiles(+e.target.value)}
      />
      <button onClick={handleSubmit}>Create</button>

      {error && (
        <p style={{ color: "red", font: "message-box", fontSize: "25px" }}>
          PLEASE, DONT BREAK IT
        </p>
      )}
    </div>
  );
};

export default TileControls;
