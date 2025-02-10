import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/lib";
import { useSettingStore } from "@/features/setting/model";
import * as markdownProcessor from "./markdownProcessor";

export const useSnippetContent = () => {
  const snippetInput = useAppSelector((state) => state.snippet.text);
  const { theme, ...snippetSetting } = useSettingStore((state) => state);

  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    (async function () {
      const markdown = markdownProcessor.preprocessMarkdown(
        snippetInput,
        snippetSetting
      );
      const result = await markdownProcessor.processMarkdown(markdown, theme);
      setHtmlContent(result);
    })();
  }, [snippetInput, snippetSetting, theme]);

  return {
    htmlContent,
    codeThemeBackgroundColor: getCodeThemeBackground(htmlContent),
    codeLineNumbers: getCodeLineNumbers(
      htmlContent,
      Number(snippetSetting.startLineNumber)
    ),
    language: snippetSetting.language,
    title: snippetSetting.title,
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
