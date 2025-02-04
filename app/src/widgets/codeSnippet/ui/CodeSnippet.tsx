import {
  CodeBlock,
  CopySnippetToClipboardButton,
  DownLoadSnippetToSVGButton,
} from "@/features/snippet/ui";
import styles from "./styles.module.css";
import {
  LanguageSelector,
  UnderLineColorInput,
  ThemeSelector,
  UnderLineNumbersInput,
} from "@/features/setting/ui";

export const CodeSnippet = () => {
  return (
    <section className={styles.codeSnippet}>
      {/* header */}
      <div className={styles.codeSnippetHeader}>
        <div>
          <LanguageSelector />
          <ThemeSelector />
        </div>
        <div>
          <CopySnippetToClipboardButton />
          <DownLoadSnippetToSVGButton />
        </div>
      </div>
      {/* content */}
      <CodeBlock />
      {/* footer */}
      <div className={styles.codeSnippetFooter}>
        {["first", "second", "third"].map((lineKey) => (
          <div>
            <UnderLineColorInput
              lineKey={lineKey as "first" | "second" | "third"}
            />
            <UnderLineNumbersInput
              lineKey={lineKey as "first" | "second" | "third"}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
