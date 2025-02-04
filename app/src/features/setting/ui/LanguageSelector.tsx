import { useAppDispatch, useAppSelector } from "@/redux/lib";
import { changeSetting } from "../model";
import { CodeLanguage, SETTING_TOOLTIP } from "../config";
import styles from "./styles.module.css";
import { useEffect } from "react";
import { withTooltip } from "@/shared/lib/withTooltip";

export const LanguageSelector = withTooltip(() => {
  const { language } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const language = localStorage.getItem("language");

    if (language) {
      dispatch(
        changeSetting({
          key: "language",
          value: language,
        })
      );
    }
  }, [dispatch]);

  return (
    <select
      className={styles.selector}
      value={language}
      onChange={({ target }) => {
        dispatch(
          changeSetting({
            key: "language",
            value: target.value,
          })
        );
      }}
    >
      {CodeLanguage.map((lang, idx) => (
        <option key={idx} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
})(SETTING_TOOLTIP.language, 1);
