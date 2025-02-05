import { useSnippetTextArea } from "../lib";
import styles from "./styles.module.css";

export const InvisibleSnippetTextArea: React.FC = () => {
  const textAreaAttributes = useSnippetTextArea();

  return (
    <div className={styles.invisibleTextAreaWrapper}>
      <textarea {...textAreaAttributes} spellCheck="false" />
    </div>
  );
};
