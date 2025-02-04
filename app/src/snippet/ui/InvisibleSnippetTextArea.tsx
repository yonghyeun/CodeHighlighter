import styles from "./styles.module.css";
import { useSnippetTextArea } from "../lib";

export const SnippetTextArea = () => {
  const { onChange, textArea, text, textAreaLineNumbers } =
    useSnippetTextArea();

  return (
    <section className={styles.snippetTextAreaWrapper}>
      <label
        htmlFor="snippetInput"
        className="
      sr-only"
      />
      <div className="flex flex-col">
        {textAreaLineNumbers.map((lineNumber) => (
          <div key={lineNumber} className="lineNumber">
            {lineNumber}
          </div>
        ))}
      </div>
      <textarea
        ref={textArea}
        className={styles.snippetInput}
        onChange={onChange}
        defaultValue={text}
        id="snippetInput"
      />
    </section>
  );
};
