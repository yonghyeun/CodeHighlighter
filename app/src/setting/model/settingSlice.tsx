import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SettingInitialState = {
  language: string;
  title: string;
  addLineNumber: string;
  removeLineNumber: string;
  pointLineNumber: string;
  showLineNumbers: string;
  addLineColor: string;
  removeLineColor: string;
  pointingColor: string;
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
  removeLineNumber: "",
  pointLineNumber: "",
  language: "tsx",
  addLineColor: "#2f502f",
  removeLineColor: "#644444",
  pointingColor: "#646682",
  theme: "dracula",
} satisfies SettingInitialState as SettingInitialState;

const itemstoStoreLocal = [
  "language",
  "addLineColor",
  "removeLineColor",
  "pointingColor",
  "theme",
];

const cssValue = ["addLineColor", "removeLineColor", "pointingColor"];

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
