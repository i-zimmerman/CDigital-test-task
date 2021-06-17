import { createSlice } from "@reduxjs/toolkit";

export const tileGameSlice = createSlice({
  name: "tileDeck",
  initialState: [],
  reducers: {
    createDeck: (_, action) => {
      // generate tiles deck
      const deckLength = action.payload;
      const tilesDeck = [];

      for (let i = 1; i <= deckLength; i++) {
        const id = "_" + Math.random().toString(36).substr(2, 9);

        if (i < deckLength / 2 + 1) {
          tilesDeck.push({
            id,
            tile: i,
          });
        } else {
          tilesDeck.push({
            id,
            tile: deckLength - i + 1,
          });
        }
      }

      return tilesDeck;
    },
    shuffleDeck: (state) => {
      // Fisher-Yates shuffle (not my implementation)
      const array = state;
      let currentIndex = array.length;
      let temporaryValue, randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    },
  },
});

// Action creators are generated for each case reducer function
export const { createDeck, shuffleDeck } = tileGameSlice.actions;

export default tileGameSlice.reducer;
