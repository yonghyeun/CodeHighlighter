import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SettingState = {
  language: string;
  firstUnderLineNumbers: string;
  secondUnderLineNumbers: string;
  thirdUnderLineNumbers: string;

  firstUnderLineColor: string;
  secondUnderLineColor: string;
  thirdUnderLineColor: string;

  showLineNumbers: string;
  title: string;

  theme: string;
};

type ChangeSettingPayload = {
  key: keyof SettingState;
  value: string;
};

const initialState = {
  showLineNumbers: "1",
  firstUnderLineNumbers: "",
  secondUnderLineNumbers: "",
  thirdUnderLineNumbers: "",
  language: "tsx",
  firstUnderLineColor: "#2f502f",
  secondUnderLineColor: "#644444",
  thirdUnderLineColor: "#646682",
  theme: "dracula",
  title: "",
} satisfies SettingState as SettingState;

export const persistStoreSettingKeys: (keyof SettingState)[] = [
  "language",
  "firstUnderLineColor",
  "secondUnderLineColor",
  "thirdUnderLineColor",
  "theme",
];

const cssVariableSettingKeys: (keyof SettingState)[] = [
  "firstUnderLineColor",
  "secondUnderLineColor",
  "thirdUnderLineColor",
];

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    changeSetting: (state, action: PayloadAction<ChangeSettingPayload>) => {
      const { key, value } = action.payload;

      if (persistStoreSettingKeys.includes(key)) {
        localStorage.setItem(key, value);
      }

      if (cssVariableSettingKeys.includes(key)) {
        const { key, value } = action.payload;
        document.documentElement.style.setProperty(`--${key}`, value);
      }

      state[key] = value;
    },
  },
});

export const { changeSetting } = settingSlice.actions;

export const settingReducer = settingSlice.reducer;
