"use client";

import styles from "./snippet.module.css";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useEffect, useState } from "react";
import { markdownProcessor } from "../lib/markdownProcessor";

export const SnippetDisplay = () => {
  const snippetInput = useAppSelector((state) => state.snippet.text);
  const showLineNumbers = useAppSelector(
    (state) => state.setting.showLineNumbers
  );
  const [backgroundColor, setBackgroundColor] = useState<string>("inherit");

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
    const $codeBlockWrapper = document.querySelector("pre");
    if (!$codeBlock || !$codeBlockWrapper) return;

    // 백그라운드 테마 색상 설정

    setBackgroundColor(getComputedStyle($codeBlockWrapper).backgroundColor);

    const children = Array.from($codeBlock.children);

    const newChildren = children.map((child, idx) => {
      const $lineWrapper = document.createElement("div");
      $lineWrapper.className = "lineWrapper";

      const $lineNumber = document.createElement("div");
      const lineNumber = Number(showLineNumbers || 1) + idx;
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

    const $snippetOutput = $codeBlock.parentElement
      ?.parentElement as HTMLElement;

    setHtmlContent($snippetOutput?.outerHTML);
  }, [htmlContent, showLineNumbers]);

  if (!htmlContent) {
    return (
      <section className={styles.snippetOutputWrapper}>
        <div className={styles.loading}>
          <LoadingIcon />
        </div>
      </section>
    );
  }

  return (
    <section
      className={styles.snippetOutputWrapper}
      style={{
        backgroundColor,
      }}
    >
      <div
        className={styles.snippetOutput}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div>
    </section>
  );
};

const LoadingIcon = () => (
  <svg
    width="5em"
    height="5em"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="animate-spin"
  >
    <g clipPath="url(#clip0_101_2)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33 48C36.3137 48 39 50.6863 39 54C39 57.3137 36.3137 60 33 60C29.6863 60 27 57.3137 27 54C27 50.6863 29.6863 48 33 48ZM14.2237 39C18.3659 39 21.7237 42.3579 21.7237 46.5C21.7237 50.6421 18.3659 54 14.2237 54C10.0816 54 6.72372 50.6421 6.72372 46.5C6.72372 42.3579 10.0816 39 14.2237 39ZM48.958 40.5C52.2717 40.5 54.958 43.1863 54.958 46.5C54.958 49.8137 52.2717 52.5 48.958 52.5C45.6443 52.5 42.958 49.8137 42.958 46.5C42.958 43.1863 45.6443 40.5 48.958 40.5ZM55.5 27.9556C57.9853 27.9556 60 29.9703 60 32.4556C60 34.9409 57.9853 36.9556 55.5 36.9556C53.0147 36.9556 51 34.9409 51 32.4556C51 29.9703 53.0147 27.9556 55.5 27.9556ZM7.5 18C11.6421 18 15 21.3579 15 25.5C15 29.6421 11.6421 33 7.5 33C3.35786 33 0 29.6421 0 25.5C0 21.3579 3.35786 18 7.5 18ZM53.3574 15.6217C55.0142 15.6217 56.3574 16.9649 56.3574 18.6217C56.3574 20.2786 55.0142 21.6217 53.3574 21.6217C51.7005 21.6217 50.3574 20.2786 50.3574 18.6217C50.3574 16.9649 51.7005 15.6217 53.3574 15.6217ZM24 0C28.9706 0 33 4.02944 33 9C33 13.9706 28.9706 18 24 18C19.0294 18 15 13.9706 15 9C15 4.02944 19.0294 0 24 0ZM46.5 9C47.3284 9 48 9.67157 48 10.5C48 11.3284 47.3284 12 46.5 12C45.6716 12 45 11.3284 45 10.5C45 9.67157 45.6716 9 46.5 9Z"
        fill="#eee"
      />
    </g>
    <defs>
      <clipPath id="clip0_101_2">
        <rect width="60" height="60" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
