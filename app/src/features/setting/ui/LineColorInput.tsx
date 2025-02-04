import { useAppDispatch, useAppSelector } from "@/redux/lib";
import { changeSetting, type SettingState } from "../model";
import styles from "./styles.module.css";

interface LineColorInputProps {
  lineKey: keyof Pick<
    SettingState,
    "addLineColor" | "removedLineColor" | "pointingLineColor"
  >;
}

export const LineColorInput: React.FC<LineColorInputProps> = ({ lineKey }) => {
  const lineColor = useAppSelector((state) => state.setting[lineKey]);
  const dispatch = useAppDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeSetting({
        key: lineKey,
        value: event.target.value,
      })
    );
  };

  return (
    <label
      htmlFor={lineKey}
      className={styles.lineColorInput}
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
