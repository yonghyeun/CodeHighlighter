import { useAppDispatch } from "@/redux/lib";
import { changeSetting } from "../model";
import styles from "./styles.module.css";
import { withTooltip } from "@/shared/lib/withTooltip";
import { SETTING_TOOLTIP } from "../config";

export const StartLineNumberInput = withTooltip(() => {
  const dispatch = useAppDispatch();

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

        dispatch(
          changeSetting({
            key: "showLineNumbers",
            value:
              isNaN(lineNumber) || lineNumber < 1 ? "1" : String(lineNumber),
          })
        );
      }}
    />
  );
})(SETTING_TOOLTIP.startLineNumber, 1);
