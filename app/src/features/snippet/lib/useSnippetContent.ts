import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/redux-hooks";
import * as markdownProcessor from "../lib/markdownProcessor";

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

  useEffect(() => {
    if (!htmlContent) return;

    const $codeBlock = document.querySelector("code");
    if (!$codeBlock) return;

    const children = Array.from($codeBlock.children);

    // TODO : 직접 번호 넣는 로직 제거하고 라인 넘버는 jsx를 통해
    // 렌더링하도록 수정
    const newChildren = children.map((child, idx) => {
      const $lineWrapper = document.createElement("div");
      $lineWrapper.className = "lineWrapper";

      const $lineNumber = document.createElement("div");
      const lineNumber = Number(snippetSetting.showLineNumbers || 1) + idx;
      $lineNumber.textContent = String(lineNumber);
      $lineNumber.className = "lineNumber";

      const codeSpan = child.matches("span[data-line]")
        ? child
        : (child.lastChild as HTMLSpanElement);

      $lineWrapper.appendChild($lineNumber);
      $lineWrapper.appendChild(codeSpan);

      return $lineWrapper;
    });

    $codeBlock.innerHTML = "";
    newChildren.forEach((newChild) => {
      $codeBlock.appendChild(newChild);
    });

    const $snippetOutput = $codeBlock!.parentElement!
      .parentElement as HTMLElement;

    setHtmlContent($snippetOutput?.outerHTML);
  }, [htmlContent, snippetSetting.showLineNumbers]);

  return {
    htmlContent,
    codeThemeBackgroundColor: getCodeThemeBackground(htmlContent),
  };
};

const getCodeThemeBackground = (html: string) => {
  const parser = new DOMParser().parseFromString(html, "text/html");
  const backgroundColor = parser.querySelector("pre")?.style.backgroundColor;
  return backgroundColor ?? "inherit";
};
