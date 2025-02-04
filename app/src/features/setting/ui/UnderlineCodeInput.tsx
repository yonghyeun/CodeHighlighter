export const DrawLineInput = () => {};

import { useAppDispatch, useAppSelector } from "@/redux/lib";
import { changeSetting } from "../model";
import styles from "./styles.module.css";
import { useEffect } from "react";
import { withTooltip } from "@/shared/lib/withTooltip";
import { SETTING_TOOLTIP } from "../config";

interface UnderLienInputProps {
  lineKey: "first" | "second" | "third";
}

export const UnderLineColorInput = withTooltip<UnderLienInputProps>(
  ({ lineKey }) => {
    const lineColorKey = `${lineKey}UnderLineColor` as const;

    const lineColor = useAppSelector((state) => state.setting[lineColorKey]);
    const dispatch = useAppDispatch();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        changeSetting({
          key: lineColorKey,
          value: event.target.value,
        })
      );
    };

    useEffect(() => {
      const lineColor = localStorage.getItem(lineColorKey);
      if (lineColor) {
        dispatch(
          changeSetting({
            key: lineColorKey,
            value: lineColor,
          })
        );
      }
    }, [dispatch, lineColorKey]);

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
  }
)(SETTING_TOOLTIP.underLineColor, 0);

export const UnderLineNumbersInput = withTooltip<UnderLienInputProps>(
  ({ lineKey }) => {
    const lineNumbersKey = `${lineKey}UnderLineNumbers` as const;
    const underLineNumbers = useAppSelector(
      (state) => state.setting[lineNumbersKey]
    );
    const dispatch = useAppDispatch();

    return (
      <input
        className={styles.inputs}
        type="text"
        id={`${lineKey}UnderLineNumbers`}
        defaultValue={underLineNumbers}
        placeholder="ex : 1,2,5-10"
        autoComplete="off"
        onChange={({ target }) => {
          dispatch(
            changeSetting({
              key: lineNumbersKey,
              value: target.value,
            })
          );
        }}
      />
    );
  }
)(SETTING_TOOLTIP.underLineNumbers, 0);
