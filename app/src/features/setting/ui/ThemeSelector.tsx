import { useAppDispatch, useAppSelector } from "@/redux/lib";
import { changeSetting } from "../model";
import { BundleTheme } from "../config";
import styles from "./styles.module.css";
import { useEffect } from "react";

export const ThemeSelector = () => {
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
  );
};
