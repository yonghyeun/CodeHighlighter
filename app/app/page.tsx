"use client";

import { StoreProvider } from "@/redux/ui";
import { CodeSnippet } from "@/widgets/codeSnippet/ui";

export default function Home() {
  return (
    <StoreProvider>
      <section className="bg-black min-h-screen flex flex-col items-center">
        <header className="flex justify-center">
          <CodeHighlighterLogo />
        </header>
        <main className="w-full flex flex-col items-center mt-40">
          <CodeSnippet />
        </main>
        <footer>
          <p className="text-white text-center mt-12">
            This project was created using{" "}
            <a href="https://rehype-pretty.pages.dev/" className="underline">
              Rehype Pretty
            </a>{" "}
            by{" "}
            <a
              href="https://github.com/yonghyeun/CodeHighlighter"
              className="italic underline"
            >
              Yonghyeun
            </a>
            🎆
          </p>
        </footer>
      </section>
    </StoreProvider>
  );
}

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
