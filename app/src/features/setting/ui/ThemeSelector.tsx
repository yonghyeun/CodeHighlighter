import { useSettingStore } from "../model";
import { BundleTheme } from "../config";
import styles from "./styles.module.css";

export const ThemeSelector = () => {
  const theme = useSettingStore((state) => state.theme);

  return (
    <select
      className={styles.selector}
      value={theme}
      onChange={({ target }) => {
        useSettingStore.setState({ theme: target.value });
      }}
    >
      {BundleTheme.map((bundleTheme, idx) => (
        <option key={idx} value={bundleTheme}>
          {bundleTheme}
        </option>
      ))}
    </select>
  );
};
