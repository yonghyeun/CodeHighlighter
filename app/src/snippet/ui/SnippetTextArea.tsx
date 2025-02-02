import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/lib";
import { changeText } from "../model/snippetSlice";
import styles from "./styles.module.css";

export const SnippetTextArea = () => {
  const { text: snippetInput } = useAppSelector((state) => state.snippet);
  const dispatch = useAppDispatch();
  const textArea = useRef<HTMLTextAreaElement>(null);

  const handleCodeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(changeText(event.target.value));
  };

  useEffect(() => {
    if (!textArea.current) {
      return;
    }

    textArea.current.style.height = "auto";
    textArea.current.style.height = `${textArea.current.scrollHeight}px`;
  }, [snippetInput]);

  return (
    <>
      <label htmlFor="snippetInput"></label>
      <textarea
        ref={textArea}
        className={styles.snippetInput}
        onChange={handleCodeInput}
        defaultValue={snippetInput}
        id="snippetInput"
      />
    </>
  );
};
