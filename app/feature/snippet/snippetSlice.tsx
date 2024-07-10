import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type InitalCode = {
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
} satisfies InitalCode as InitalCode;

const snippetSlice = createSlice({
  name: 'snippet',
  initialState,
  reducers: {
    changeText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const { changeText } = snippetSlice.actions;
export default snippetSlice.reducer;
