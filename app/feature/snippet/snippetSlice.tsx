import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type InitalCode = {
  text: string;
};

const initialState = {
  text: '',
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
