import React from "react";

const Tile = ({ className, secret, ...props }) => {
  return (
    <div {...props} className={className}>
      {secret}
    </div>
  );
};

export default Tile;
