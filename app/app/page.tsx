"use client";

import { StoreProvider } from "@/redux/ui";
import { Setting } from "@/setting/ui";
import {
  CopySnippetToClipboardButton,
  DownLoadSnippetToSVGButton,
  SnippetTextArea,
} from "@/snippet/ui";
import { SnippetDisplay } from "@/snippet/ui/SnippetDisplay";

export default function Home() {
  return (
    <main className="flex md:flex-col min-h-screen">
      <StoreProvider>
        <section className="flex flex-col flex-1 bg-slate-900 md:bg-black-100 overflow-x-scroll output ">
          <div className="flex flex-col items-center  h-full gap-5  overflow-scroll output">
            <h1 className="inline">
              <CodeHighlighterLogo />
            </h1>
            <section className="flex flex-col items-center w-full">
              <div className=" flex w-[90%] px-[1.5rem] mb-2 gap-[0.5rem] justify-end">
                <CopySnippetToClipboardButton />
                <DownLoadSnippetToSVGButton />
              </div>
              <SnippetDisplay />
              <IntroduceText />
            </section>
          </div>
        </section>
        <section className="flex-1 bg-slate-900">
          <div className="flex flex-col gap-5  h-full justify-center items-center">
            <SnippetTextArea />
            <Setting>
              <Setting.Language />
              <Setting.Theme />
              <Setting.Title />
              <Setting.ShowLineNumbers />
              <Setting.AddLine />
              <Setting.PointLine />
            </Setting>
          </div>
        </section>
      </StoreProvider>
    </main>
  );
}

const IntroduceText = () => {
  return (
    <div className="container md:hidden mx-auto px-4 py-8 w-[90%] min-w-[390px]">
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
              <strong>Remove:</strong> Highlight removed lines with a different
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
    </div>
  );
};

const CodeHighlighterLogo = () => (
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
);
