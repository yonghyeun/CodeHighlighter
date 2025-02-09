import { toCanvas } from "html-to-image";
import { useRef } from "react";
import { useInteractionStatusStore } from "../model";
import { canvasToBlob, createCodeBlockEditor } from "./utils";
import { PIXEL_RATIO } from "./config";

export const useCopySnippetImage = () => {
  const status = useInteractionStatusStore((state) => state.status);
  const setStatus = useInteractionStatusStore.setState;

  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = async () => {
    setStatus({ status: "loading" });
    if (statusTimerRef.current) {
      clearTimeout(statusTimerRef.current);
    }

    const $codeBlock = document.querySelector("#codeBlock") as HTMLDivElement;

    const codeBlockEditor = createCodeBlockEditor(
      $codeBlock,
      document.querySelector("#codeBlockTitle") as HTMLInputElement
    );

    try {
      codeBlockEditor.resizing();

      const canvas = await toCanvas($codeBlock, {
        pixelRatio: PIXEL_RATIO,
      });

      const blob = await canvasToBlob(canvas);

      const clipboardItem = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([clipboardItem]);

      setStatus({ status: "succeed" });
    } catch (error) {
      console.error(error);
      setStatus({ status: "fail" });
    } finally {
      codeBlockEditor.restore();

      statusTimerRef.current = setTimeout(() => {
        setStatus({ status: "idle" });
      }, 1000);
    }
  };

  return { status, handleCopy };
};
