import { CopyIcon, SaveIcon } from "./Icons";
import StatusIcon from "./Status";
import * as htmlToImage from "html-to-image";
import { useState } from "react";

/* 로딩 시간이 매우 짧으니 loading 상태는 빼자 */
export type Status = "idle" | "succeed" | "fail";

export const CopyButton = () => {
  const [status, setStatus] = useState<Status>("idle");

  const handleCopy = () => {
    (async function () {
      const $codeBlock = document.querySelector("pre");
      if (!$codeBlock) {
        return;
      }
      /* 스크롤바 없애기 전 저장 */
      const originalWidth = $codeBlock.style.width;
      const originalOverflowX = $codeBlock.style.overflowX;

      try {
        $codeBlock.style.width = "fit-content";
        $codeBlock.style.overflow = "visible";
        const canvas = await htmlToImage.toCanvas($codeBlock, {
          quality: 1,
          pixelRatio: 2,
        });

        canvas.toBlob(async (blob) => {
          if (blob) {
            const clipboardItem = new ClipboardItem({ "image/png": blob });
            await navigator.clipboard.write([clipboardItem]);
          } else {
            throw new Error("failed to create blob");
          }
        }, "image/png");
        setStatus("succeed");
      } catch (error) {
        console.error(error);
        setStatus("fail");
      } finally {
        /* 스크롤바 복원  */
        $codeBlock.style.width = originalWidth;
        $codeBlock.style.overflow = originalOverflowX;

        setTimeout(() => {
          setStatus("idle");
        }, 1000);
      }
    })();
  };

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

export const DownLoadButton = () => {
  const handleDownload = () => {
    (async function () {
      const $codeBlock = document.querySelector("pre");
      if (!$codeBlock) {
        return;
      }

      /* 스크롤바 없애기 전 저장 */
      const originalWidth = $codeBlock.style.width;
      const originalOverflowX = $codeBlock.style.overflowX;
      try {
        /* 스크롤바 없애기  */
        $codeBlock.style.width = "fit-content";
        $codeBlock.style.overflow = "visible";

        const dataUrl = await htmlToImage.toPng($codeBlock, {
          quality: 1,
          pixelRatio: 2,
        });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "code.png";
        link.click();
      } catch (error) {
        console.error(error);
      } finally {
        /* 스크롤바 복원  */
        $codeBlock.style.width = originalWidth;
        $codeBlock.style.overflowX = originalOverflowX;
      }
    })();
  };

  return (
    <button
      className="bg-slate-700 rounded-xl text-xl  flex items-center px-4 py-2  mb-2 transition-transform duration-300 ease-in-out hover:scale-110"
      onClick={handleDownload}
    >
      <SaveIcon />
      <p className="ml-2 text-sm">Download Image</p>
    </button>
  );
};
