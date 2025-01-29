import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { changeText } from "./snippetSlice";
import styles from "./snippet.module.css";
import { useEffect, useRef } from "react";

const SnippetInput = () => {
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
        id="sinippetInput"
      />
    </>
  );
};

export default SnippetInput;
