import { useSettingStore } from "../model";
import { CodeLanguage } from "../config";
import styles from "./styles.module.css";

export const LanguageSelector = () => {
  const language = useSettingStore((state) => state.language);

  return (
    <select
      className={styles.selector}
      value={language}
      onChange={({ target }) => {
        useSettingStore.setState({ language: target.value });
      }}
    >
      {CodeLanguage.map((lang, idx) => (
        <option key={idx} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
};
