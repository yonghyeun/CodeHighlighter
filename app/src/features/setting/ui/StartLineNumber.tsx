import { useSettingStore } from "../model";
import styles from "./styles.module.css";
import React from "react";

export const StartLineNumberInput: React.FC = () => {
  return (
    <input
      className={styles.inputs}
      type="text"
      id="startLineNumber"
      placeholder="start line number"
      autoComplete="off"
      onChange={({ target }) => {
        const value = target.value;
        const lineNumber = parseInt(value);

        useSettingStore.setState({
          startLineNumber:
            isNaN(lineNumber) || lineNumber < 1 ? "1" : String(lineNumber),
        });
      }}
    />
  );
};
