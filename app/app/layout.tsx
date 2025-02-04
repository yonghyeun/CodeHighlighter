import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HighlightCode - Convert Text Code to Highlighted Images",
  description:
    "Code Highlighter transforms text code into visually appealing images with highlighted lines, perfect for sharing and presenting code snippets.",
  keywords:
    "code highlighter, code to image, highlighted code, code snippets, code presentation, code sharing",
  robots: "index,follow",
  openGraph: {
    title: "HighlightCode",
    description:
      "Code Highlighter transforms text code into visually appealing images with highlighted lines, perfect for sharing and presenting code snippets.",
    images: "/asset/thumbnail.png",
    url: "highlightcode.site",
    type: "website",
  },
  twitter: {
    title: "HighlightCode",
    description:
      "Code Highlighter transforms text code into visually appealing images with highlighted lines, perfect for sharing and presenting code snippets.",
    images: "/asset/thumbnail.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="asset/favicon.ico"></link>
      <meta
        name="google-site-verification"
        content="5dPXAxRRopl2GMdIlSt-fb7P9YcSH7oCGjGaHmpjP6U"
      />
      <meta
        name="google-site-verification"
        content="F_4Jl1HCjr89dFUxZXEiET0Cs4XSkLb3FdPLJdxu93o"
      />
      <Analytics />
      <body>{children}</body>
    </html>
  );
}
