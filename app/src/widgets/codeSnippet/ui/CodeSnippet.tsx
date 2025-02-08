"use client";

import {
  CodeBlock,
  CopySnippetToClipboardButton,
  DownloadSnippetButton,
} from "@/features/snippet/ui";
import styles from "./styles.module.css";
import {
  LanguageSelector,
  UnderLineColorInput,
  ThemeSelector,
  UnderLineNumbersInput,
  StartLineNumberInput,
} from "@/features/setting/ui";
import { StoreProvider } from "@/redux/ui";
import { WithTooltip } from "@/shared/ui/WithTooltip";
import { SETTING_TOOLTIP } from "@/features/setting/config";
import { SNIPPET_TOOLTIP } from "@/features/snippet/config";

export const CodeSnippet = () => {
  return (
    <StoreProvider>
      <section className={styles.codeSnippet}>
        {/* header */}
        <div className={styles.codeSnippetHeader}>
          <div>
            <WithTooltip tooltipText={SETTING_TOOLTIP.language} direction="top">
              <LanguageSelector />
            </WithTooltip>

            <WithTooltip tooltipText={SETTING_TOOLTIP.theme} direction="top">
              <ThemeSelector />
            </WithTooltip>

            <WithTooltip
              tooltipText={SETTING_TOOLTIP.startLineNumber}
              direction="top"
            >
              <StartLineNumberInput />
            </WithTooltip>
          </div>
          <div>
            <WithTooltip
              tooltipText={SNIPPET_TOOLTIP.copySnippet}
              direction="top"
            >
              <CopySnippetToClipboardButton />
            </WithTooltip>

            <WithTooltip
              tooltipText={SNIPPET_TOOLTIP.downloadSnippet}
              direction="top"
            >
              <DownloadSnippetButton />
            </WithTooltip>
          </div>
        </div>
        {/* content */}
        <CodeBlock />
        {/* footer */}
        <div className={styles.codeSnippetFooter}>
          {["first", "second", "third"].map((lineKey) => (
            <div key={lineKey}>
              <WithTooltip
                tooltipText={SETTING_TOOLTIP.underLineColor}
                direction="bottom"
              >
                <UnderLineColorInput
                  lineKey={lineKey as "first" | "second" | "third"}
                />
              </WithTooltip>
              <WithTooltip
                tooltipText={SETTING_TOOLTIP.underLineNumbers}
                direction="bottom"
              >
                <UnderLineNumbersInput
                  lineKey={lineKey as "first" | "second" | "third"}
                />
              </WithTooltip>
            </div>
          ))}
        </div>
      </section>
    </StoreProvider>
  );
};
