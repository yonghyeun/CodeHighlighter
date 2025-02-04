"use client";

import { StoreProvider } from "@/redux/ui";
import { Setting } from "@/setting/ui";
import {
  CopySnippetToClipboardButton,
  DownLoadSnippetToSVGButton,
  CodeSnippet,
} from "@/snippet/ui";

export default function Home() {
  return (
    <StoreProvider>
      <main className="bg-black">
        <div className="flex justify-center">
          <CodeHighlighterLogo />
        </div>
        <section className="w-full flex flex-col items-center">
          <div className="w-full max-w-5xl px-2">
            <HighlighCodeButtonWidget />
            <CodeSnippet />
            <HighlighCodeSettingWidget />
            <IntroduceText />
          </div>
        </section>
      </main>
    </StoreProvider>
  );
}

const IntroduceText = () => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
      <ul className="list-disc list-inside space-y-4">
        <li>
          <strong>Code Language Selection:</strong> Choose from a variety of
          programming languages to highlight your code accurately.
        </li>
        <li>
          <strong>Theme Setting:</strong> Personalize the appearance of your
          code with multiple theme options.
        </li>
        <li>
          <strong>Code Start Number Setting:</strong> Define the starting line
          number for your code to provide better context.
        </li>
        <li>
          <strong>Code Highlighting Options:</strong> Highlight your code with
          three distinct styles:
          <ul className="list-disc list-inside mt-2 space-y-2 pl-4">
            <li>
              <strong>Add:</strong> Highlight added lines with a specific color.
            </li>
            <li>
              <strong>Removed:</strong> Highlight removed lines with a different
              color.
            </li>
            <li>
              <strong>Pointing:</strong> Highlight specific lines that need
              attention.
            </li>
          </ul>
        </li>
        <li>
          <strong>Color Setting and Line Setting:</strong> Customize the colors
          used for highlighting and specify which lines should be highlighted.
        </li>
      </ul>
      <p className="text-lg  mt-6">
        You can view the entire code on{" "}
        <a
          href="https://github.com/yonghyeun/CodeHighlighter"
          className="text-blue-500 "
        >
          GitHub
        </a>
        .
      </p>
    </section>
  );
};

const CodeHighlighterLogo = () => (
  <h1>
    <svg width="400" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="transparent" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="body-font, sans-serif"
        fontSize="45"
        fontWeight="700"
        fontStyle="italic"
        fill="#61dafb"
        style={{ filter: "drop-shadow(2px 2px 0px #000000)" }}
      >
        HighlightCode
      </text>
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="body-font, sans-serif"
        fontSize="45"
        fontWeight="700"
        fontStyle="italic"
        fill="#61dafb"
        style={{ filter: "drop-shadow(1px 1px 0px #000000)" }}
      >
        HighlightCode
      </text>
    </svg>
  </h1>
);

const HighlighCodeButtonWidget = () => (
  <div className=" flex mb-2 gap-[0.5rem] justify-end">
    <CopySnippetToClipboardButton />
    <DownLoadSnippetToSVGButton />
  </div>
);

const HighlighCodeSettingWidget = () => (
  <Setting>
    <Setting.Language />
    <Setting.Theme />
    <Setting.Title />
    <Setting.ShowLineNumbers />
    <Setting.AddLine />
    <Setting.PointingLine />
    <Setting.RemoveLine />
  </Setting>
);
