import { toCanvas } from "html-to-image";
import { useState } from "react";
import { useCopySnippetImage } from "../lib";

export const CopySnippetToClipboardButton = () => {
  const { status, handleCopy } = useCopySnippetImage();

  return (
    <button
      className="bg-slate-700 rounded-xl text-xl  flex items-center px-4 py-2  mb-2 transition-transform duration-300 ease-in-out hover:scale-110 
    relative"
      onClick={handleCopy}
    >
      <StatusIcon status={status} />
      <CopyIcon />
      <p className="ml-2 text-sm">Copy Image</p>
    </button>
  );
};

/* 로딩 시간이 매우 짧으니 loading 상태는 빼자 */
export type Status = "idle" | "succeed" | "fail";

const CopyIcon = () => (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M52.5 20C52.5 15.8579 49.1423 12.5 45 12.5H25C20.8579 12.5 17.5 15.8579 17.5 20V50C17.5 54.1423 20.8579 57.5 25 57.5H45C49.1423 57.5 52.5 54.1423 52.5 50V20ZM47.5 20C47.5 18.6193 46.3807 17.5 45 17.5H25C23.6193 17.5 22.5 18.6193 22.5 20V50C22.5 51.3807 23.6193 52.5 25 52.5H45C46.3807 52.5 47.5 51.3807 47.5 50V20Z"
      fill="white"
    />
    <path
      d="M15 7.5H40C41.3807 7.5 42.5 6.3807 42.5 5C42.5 3.6193 41.3807 2.5 40 2.5H15C10.8579 2.5 7.5 5.85788 7.5 10V45C7.5 46.3807 8.6193 47.5 10 47.5C11.3807 47.5 12.5 46.3807 12.5 45V10C12.5 8.6193 13.6193 7.5 15 7.5Z"
      fill="white"
    />
  </svg>
);

const StatusIcon = ({ status }: { status: Status }) => {
  switch (status) {
    case "idle":
      return <p className="hidden"></p>;
    case "succeed":
      return <p className="text-sm mr-2">🙆</p>;
    case "fail":
      return <p className="text-sm mr-2">🙅‍♂️</p>;
  }
};
