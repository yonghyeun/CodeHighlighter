import {
  CodeBlock,
  CopySnippetToClipboardButton,
  DownLoadSnippetToSVGButton,
} from "@/features/snippet/ui";
import styles from "./styles.module.css";
import {
  LanguageSelector,
  LineColorInput,
  ThemeSelector,
} from "@/features/setting/ui";

export const CodeSnippet = () => {
  return (
    <section>
      {/* header */}
      <div className={styles.codeSnippetHeader}>
        <div>
          <LanguageSelector />
          <ThemeSelector />
          <div className={styles.lineColorInputContainer}>
            <LineColorInput lineKey="addLineColor" />
            <LineColorInput lineKey="removedLineColor" />
            <LineColorInput lineKey="pointingLineColor" />
          </div>
        </div>
        <div>
          <CopySnippetToClipboardButton />
          <DownLoadSnippetToSVGButton />
        </div>
      </div>
      {/* content */}
      <CodeBlock />
    </section>
  );
};
