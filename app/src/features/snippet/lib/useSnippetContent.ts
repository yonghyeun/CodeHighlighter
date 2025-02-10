import { useEffect, useState } from "react";
import { useSettingStore } from "@/features/setting/model";
import * as markdownProcessor from "./markdownProcessor";
import { useSnippetStore } from "../model";

export const useSnippetContent = () => {
  const text = useSnippetStore((state) => state.text);
  const title = useSnippetStore((state) => state.title);
  const { theme, ...snippetSetting } = useSettingStore((state) => state);

  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    (async function () {
      const markdown = markdownProcessor.getRehypePrettyMarkdown(
        text,
        snippetSetting
      );
      const result = await markdownProcessor.convertMarkdownToHtml(
        markdown,
        theme
      );
      setHtmlContent(result);
    })();
  }, [text, snippetSetting, theme]);

  return {
    htmlContent,
    codeThemeBackgroundColor: getCodeThemeBackground(htmlContent),
    codeLineNumbers: getCodeLineNumbers(
      htmlContent,
      Number(snippetSetting.startLineNumber)
    ),
    language: snippetSetting.language,
    title,
  };
};

const getCodeThemeBackground = (html: string) => {
  if (typeof window === "undefined") {
    return "inherit";
  }

  const parser = new DOMParser().parseFromString(html, "text/html");
  const backgroundColor = parser.querySelector("pre")?.style.backgroundColor;
  return backgroundColor ?? "inherit";
};

const getCodeLineNumbers = (html: string, startNumber: number = 1) => {
  if (typeof window === "undefined") {
    return [];
  }

  const parser = new DOMParser().parseFromString(html, "text/html");
  const numOfCodeLines = parser.querySelectorAll("span[data-line]").length;

  return Array.from({ length: numOfCodeLines }, (_, i) => i + startNumber);
};
