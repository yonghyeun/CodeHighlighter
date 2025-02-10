import { useSettingStore } from "../model";
import styles from "./styles.module.css";
import React from "react";

interface UnderLienInputProps {
  lineKey: "first" | "second" | "third";
}

export const UnderLineColorInput: React.FC<UnderLienInputProps> = ({
  lineKey,
}) => {
  const lineColorKey = `${lineKey}UnderLineColor` as const;
  const lineColor = useSettingStore(
    (state) => state[`${lineKey}UnderLineColor`]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    useSettingStore.setState({
      [lineColorKey]: event.target.value,
    });
  };

  return (
    <label
      htmlFor={lineKey}
      className={styles.UnderLineColorInput}
      style={{
        backgroundColor: lineColor,
      }}
    >
      <input
        type="color"
        onChange={handleChange}
        value={lineColor}
        id={lineKey}
      />
    </label>
  );
};

export const UnderLineNumbersInput: React.FC<UnderLienInputProps> = ({
  lineKey,
}) => {
  const lineNumbersKey = `${lineKey}UnderLineNumbersExpressions` as const;
  const underLineNumbers = useSettingStore((state) => state[lineNumbersKey]);

  return (
    <input
      className={styles.inputs}
      type="text"
      id={`${lineKey}UnderLineNumbers`}
      defaultValue={underLineNumbers}
      placeholder="ex : 1,2,5-10"
      autoComplete="off"
      onChange={({ target }) => {
        useSettingStore.setState({
          [lineNumbersKey]: target.value,
        });
      }}
    />
  );
};
