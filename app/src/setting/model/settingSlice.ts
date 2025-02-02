import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SettingInitialState = {
  language: string;
  title: string;
  addLineNumber: string;
  removedLineNumber: string;
  pointingLineNumber: string;
  showLineNumbers: string;
  addLineColor: string;
  removedLineColor: string;
  pointingLineColor: string;
  theme: string;
};

type ChangeSettingPayload = {
  type: "setting";
  key: keyof SettingInitialState;
  value: string;
};

const initialState = {
  showLineNumbers: "1",
  title: "",
  addLineNumber: "",
  removedLineNumber: "",
  pointingLineNumber: "",
  language: "tsx",
  addLineColor: "#2f502f",
  removedLineColor: "#644444",
  pointingLineColor: "#646682",
  theme: "dracula",
} satisfies SettingInitialState as SettingInitialState;

const itemstoStoreLocal = [
  "language",
  "addLineColor",
  "removedLineColor",
  "pointingLineColor",
  "theme",
];

const cssValue = ["addLineColor", "removedLineColor", "pointingLineColor"];

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    changeSetting: (state, action: PayloadAction<ChangeSettingPayload>) => {
      const { key, value } = action.payload;
      state[key] = value;

      if (itemstoStoreLocal.includes(key)) {
        localStorage.setItem(key, value);
      }

      if (cssValue.includes(key)) {
        document.documentElement.style.setProperty(`--${key}`, value);
      }
    },
  },
});

export const { changeSetting } = settingSlice.actions;

export const settingReducer = settingSlice.reducer;
