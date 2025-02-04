"use client";

import { StoreProvider } from "@/redux/ui";
import { CodeSnippet } from "@/widgets/codeSnippet/ui";

export default function Home() {
  return (
    <StoreProvider>
      <main className="bg-black">
        <div className="flex justify-center">
          <CodeHighlighterLogo />
        </div>
        <CodeSnippet />
      </main>
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
