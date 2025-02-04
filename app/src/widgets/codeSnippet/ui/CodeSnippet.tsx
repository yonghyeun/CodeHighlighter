import { CodeBlock } from "@/features/snippet/ui";
import styles from "./styles.module.css";
import { LanguageSelector, ThemeSelector } from "@/features/setting/ui";

export const CodeSnippet = () => {
  return (
    <section>
      {/* header */}
      <div className={styles.codeSnippetHeader}>
        <div>
          <LanguageSelector />
          <ThemeSelector />
        </div>
      </div>
      {/* content */}
      <CodeBlock />
    </section>
  );
};
