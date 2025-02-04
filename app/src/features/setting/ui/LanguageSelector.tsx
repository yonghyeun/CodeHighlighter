import { useAppDispatch, useAppSelector } from "@/redux/lib";
import { changeSetting } from "../model";
import { CodeLanguage } from "../config";
import styles from "./styles.module.css";
import { useEffect } from "react";

export const LanguageSelector = () => {
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
    <div>
      <label htmlFor="language" />
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
    </div>
  );
};
