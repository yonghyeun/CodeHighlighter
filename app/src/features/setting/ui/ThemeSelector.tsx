import { useAppDispatch, useAppSelector } from "@/redux/lib";
import { changeSetting } from "../model";
import { BundleTheme } from "../config";
import styles from "./styles.module.css";

export const ThemeSelector = () => {
  const { theme } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();

  return (
    <div>
      <label htmlFor="theme" />
      <select
        className={styles.selector}
        value={theme}
        onChange={({ target }) => {
          dispatch(
            changeSetting({
              key: "theme",
              value: target.value,
            })
          );
        }}
      >
        {BundleTheme.map((bundleTheme, idx) => (
          <option key={idx} value={bundleTheme}>
            {bundleTheme}
          </option>
        ))}
      </select>
    </div>
  );
};
