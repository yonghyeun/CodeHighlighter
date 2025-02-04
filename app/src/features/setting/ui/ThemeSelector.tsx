import { useAppDispatch, useAppSelector } from "@/redux/lib";
import { changeSetting } from "../model";
import { BundleTheme, SETTING_TOOLTIP } from "../config";
import styles from "./styles.module.css";
import { useEffect } from "react";
import { withTooltip } from "@/shared/lib/withTooltip";

export const ThemeSelector = withTooltip(() => {
  const { theme } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme) {
      dispatch(
        changeSetting({
          key: "theme",
          value: theme,
        })
      );
    }
  }, [dispatch]);

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
})(SETTING_TOOLTIP.theme, 1);
