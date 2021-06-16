import React, { Component } from "react";
import Tile from "./Tile";
import styled from "styled-components";

const StyledTile = styled(Tile)`
  border: 2px solid #000;
  border-radius: 5px;
  background-color: #7b91ff;
  height: 100px;
  cursor: pointer;

  &:hover {
    background-color: #7164e8;
  }
`;

const Grid = styled.div`
  width: 50%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px 10px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15%;
  background-color: #62bdff;
  border-radius: 10px;
  flex-direction: column;
`;

// button from styled components
const StyledButton = styled.button`
  padding: 20px;
  margin-top: 30px;
  background-color: #6ed2ff;
  font-size: 1em;
  border: 2px solid #000;
  border-radius: 3px;

  &:hover {
    background-color: #5895e8;
    cursor: pointer;
  }
`;

class TilesTable extends Component {
  state = {
    tilesCount: 15,
  };

  renderTable = () => {
    const { tilesCount } = this.state;
    const tilesArray = [];

    for (let i = 0; i <= tilesCount; i++) {
      tilesArray.push(<StyledTile key={i} />);
    }

    return tilesArray;
  };

  render() {
    return (
      <>
        <Container>
          <Grid>{this.renderTable()}</Grid>
          <StyledButton>Start the game</StyledButton>
        </Container>
      </>
    );
  }
}

export default TilesTable;
