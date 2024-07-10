import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorageValue } from './utils';

export type SettingInitalState = {
  language: string;
  title: string;
  showLineNumbers: string;
  addLineColor: string;
  removeLineColor: string;
  pointingColor: string;
  theme: string;
};

type ChangeSettingPayload = {
  key: keyof SettingInitalState;
  value: string;
};

const initialState = {
  showLineNumbers: '1',
  title: '',
  language: getLocalStorageValue('language', 'tsx'),
  addLineColor: getLocalStorageValue('addColor', '#d4fcbc'),
  removeLineColor: getLocalStorageValue('removeColor', '#f8d7da'),
  pointingColor: getLocalStorageValue('pointingColor', '#d1ecf1'),
  theme: getLocalStorageValue('theme', 'matrial-darker-theme'),
  /* 추가로 다른 타입들의 값이 추가 될 수 있다. */
} satisfies SettingInitalState as SettingInitalState;

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    changeSetting: (state, action: PayloadAction<ChangeSettingPayload>) => {
      const { key, value } = action.payload;
      state[key] = value;

      if (key !== 'showLineNumbers' && key !== 'title') {
        localStorage.setItem(key, value);
      }
    },
  },
});

export const { changeSetting } = settingSlice.actions;

export default settingSlice.reducer;
