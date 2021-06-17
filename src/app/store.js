import { configureStore } from "@reduxjs/toolkit";
import tileDeck from "./tileDeck";

export const store = configureStore({
  reducer: {
    tileDeck: tileDeck,
  },
});
