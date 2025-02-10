import { useRef } from "react";
import { useSnippetStore } from "../model";
import {
  canvasToBlob,
  createCanvasElement,
  createCodeBlockEditor,
} from "./utils";

export const useCopySnippetImage = () => {
  const status = useSnippetStore((state) => state.status);
  const setStatus = useSnippetStore.setState;

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

      const canvas = await createCanvasElement($codeBlock);
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
