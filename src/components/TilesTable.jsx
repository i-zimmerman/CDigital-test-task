import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { createDeck, shuffleDeck } from "../app/tileDeck";
import Tile from "./Tile";
import TileControls from "./TileControls";

const StyledTile = styled(Tile)`
  border: 2px solid #000;
  border-radius: 5px;
  background-color: ${(props) => {
    let color = "#7b91ff";

    if (props.opened) color = "brown";
    if (props.disabled) color = "blanchedalmond";

    return color;
  }};
  height: 100px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => (props.opened || props.disabled ? "100px" : "0px")};
`;

const TileGrid = styled.div`
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

class TilesTable extends Component {
  state = {
    tilesCount: 16,
    selectedTiles: [],
    selectedTileIds: [],
    correctlyGuessed: [],
  };

  componentDidMount() {
    this.initGame();
  }

  componentDidUpdate() {
    if (this.state.correctlyGuessed.length === this.state.tilesCount) {
      setTimeout(() => {
        alert("You won the game");
        this.setState({
          selectedTileIds: [],
          selectedTiles: [],
          correctlyGuessed: [],
        });
        this.initGame();
      }, 400);
    }
  }

  initGame = () => {
    this.props.createDeck(this.state.tilesCount);
    this.props.shuffleDeck();
  };

  handleTileCLick = (tile) => {
    const { selectedTileIds, selectedTiles } = this.state;

    // handle same tile click
    if (selectedTileIds.includes(tile.id)) return;

    if (selectedTileIds.length < 2) {
      this.setState(
        {
          selectedTileIds: [...selectedTileIds, tile.id],
          selectedTiles: [...selectedTiles, tile.tile],
        },
        () => {
          this.compareTiles();
        }
      );
    }
  };

  handleChangeTilesTable = (newTilesCount) => {
    this.setState(
      {
        tilesCount: newTilesCount,
      },
      () => this.initGame()
    );
  };

  compareTiles = () => {
    const { selectedTileIds, selectedTiles, correctlyGuessed } = this.state;

    if (selectedTileIds.length !== 2) return;

    if (selectedTiles[0] === selectedTiles[1]) {
      this.setState({
        correctlyGuessed: [
          ...correctlyGuessed,
          selectedTileIds[0],
          selectedTileIds[1],
        ],
      });
    }

    setTimeout(() => {
      this.setState({
        selectedTileIds: [],
        selectedTiles: [],
      });
    }, 500);
  };

  renderTable = () => {
    const { deck } = this.props;
    const { selectedTileIds, correctlyGuessed } = this.state;

    return deck.map((tile) => {
      return (
        <StyledTile
          key={tile.id}
          onClick={() => this.handleTileCLick(tile)}
          secret={tile.tile}
          opened={selectedTileIds.includes(tile.id) ? 1 : 0}
          disabled={correctlyGuessed.includes(tile.id)}
        />
      );
    });
  };

  render() {
    return (
      <>
        <Container>
          <TileGrid>{this.renderTable()}</TileGrid>
          <TileControls
            currentTiles={this.state.tilesCount}
            onSubmit={this.handleChangeTilesTable}
          />
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  deck: state.tileDeck,
});

const mapDispatchToProps = {
  createDeck,
  shuffleDeck,
};

export default connect(mapStateToProps, mapDispatchToProps)(TilesTable);
