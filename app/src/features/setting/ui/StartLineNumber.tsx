import { useAppDispatch } from "@/redux/lib";
import { changeSetting } from "../model";
import styles from "./styles.module.css";

export const StartLineNumberInput = () => {
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
};
