export const DrawLineInput = () => {};

import { useAppDispatch, useAppSelector } from "@/redux/lib";
import { changeSetting } from "../model";
import styles from "./styles.module.css";

interface UnderLienInputProps {
  lineKey: "first" | "second" | "third";
}

export const UnderLineColorInput: React.FC<UnderLienInputProps> = ({
  lineKey,
}) => {
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
  const lineNumbersKey = `${lineKey}UnderLineNumbers` as const;
  const underLineNumbers = useAppSelector(
    (state) => state.setting[lineNumbersKey]
  );
  const dispatch = useAppDispatch();

  return (
    <input
      className={styles.underLineNumbersInput}
      type="text"
      id="thirdUnderLineNumbers"
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
};
