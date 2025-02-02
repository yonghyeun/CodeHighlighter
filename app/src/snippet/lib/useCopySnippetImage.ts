import { toCanvas } from "html-to-image";
import { useRef, useState } from "react";

export type Status = "idle" | "succeed" | "fail";

export const useCopySnippetImage = () => {
  const [status, setStatus] = useState<Status>("idle");
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = async () => {
    if (statusTimerRef.current) {
      clearTimeout(statusTimerRef.current);
    }

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

      const canvas = await toCanvas($codeBlock, {
        quality: 1,
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
      console.error("Failed to copy SVG to clipboard:", error);
      setStatus("fail");
    } finally {
      $codeBlock.style.width = originalWidth;
      $codeBlock.style.overflowX = originalOverflowX;

      statusTimerRef.current = setTimeout(() => {
        setStatus("idle");
      }, 1000);
    }
  };

  return { status, handleCopy };
};
