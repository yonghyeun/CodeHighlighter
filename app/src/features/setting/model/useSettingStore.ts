import {
  createHtmlCSSPropertyMiddleware,
  createLocalStorageMiddleware,
  createLocalStorageInitializer,
  createStore,
} from "@/shared/lib/store";

export type SettingState = {
  // Code language
  language: string;
  // Underline numbers
  // ex "1,2,3-10"
  firstUnderLineNumbersExpressions: string;
  secondUnderLineNumbersExpressions: string;
  thirdUnderLineNumbersExpressions: string;
  // Underline colors
  // ex "#2f502f" , 'rgb(0,0,0)'
  firstUnderLineColor: string;
  secondUnderLineColor: string;
  thirdUnderLineColor: string;
  // startLineNumbers
  startLineNumber: number;

  // Code theme
  theme: string;
};

const SETTING_INITIAL_STATE: SettingState = {
  startLineNumber: 1,
  firstUnderLineNumbersExpressions: "",
  secondUnderLineNumbersExpressions: "",
  thirdUnderLineNumbersExpressions: "",
  language: "tsx",
  firstUnderLineColor: "#2f502f",
  secondUnderLineColor: "#644444",
  thirdUnderLineColor: "#646682",
  theme: "material-theme",
};

const PERSIST_STATE_KEYS: (keyof SettingState)[] = [
  "language",
  "firstUnderLineColor",
  "secondUnderLineColor",
  "thirdUnderLineColor",
  "theme",
];

const HTML_CSS_PROPERTY_KEYS: (keyof SettingState)[] = [
  "firstUnderLineColor",
  "secondUnderLineColor",
  "thirdUnderLineColor",
];

export const useSettingStore = createStore(SETTING_INITIAL_STATE, {
  middlewares: [
    createLocalStorageMiddleware(PERSIST_STATE_KEYS),
    createHtmlCSSPropertyMiddleware(HTML_CSS_PROPERTY_KEYS),
  ],
  initializers: [createLocalStorageInitializer(PERSIST_STATE_KEYS)],
});
