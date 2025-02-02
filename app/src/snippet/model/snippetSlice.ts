import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type InitialCode = {
  text: string;
};

const initialState = {
  text: `import React from 'react';

type Props = {
  message: string;
};

const SimpleComponent: React.FC<Props> = ({ message }) => {
  return <div>{message}</div>;
};

export default SimpleComponent;`,
} satisfies InitialCode as InitialCode;

const snippetSlice = createSlice({
  name: "snippet",
  initialState,
  reducers: {
    changeText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const { changeText } = snippetSlice.actions;
export const snippetReducer = snippetSlice.reducer;
