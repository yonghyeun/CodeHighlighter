import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/lib";

import * as markdownProcessor from "./markdownProcessor";

export const useSnippetContent = () => {
  const snippetInput = useAppSelector((state) => state.snippet.text);
  const snippetSetting = useAppSelector((state) => state.setting);
  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    (async function () {
      const markdown = markdownProcessor.preprocessMarkdown(
        snippetInput,
        snippetSetting
      );
      const result = await markdownProcessor.processMarkdown(
        markdown,
        snippetSetting.theme
      );
      setHtmlContent(result);
    })();
  }, [snippetInput, snippetSetting]);

  return {
    htmlContent,
    codeThemeBackgroundColor: getCodeThemeBackground(htmlContent),
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
