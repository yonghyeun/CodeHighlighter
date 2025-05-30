import { useRef } from "react";
import { useSnippetContent } from "./useSnippetContent";
import {
  canvasToBlob,
  createCanvasElement,
  createCodeBlockEditor,
} from "./utils";
import { useSnippetStore } from "../model";

export const useSaveSnippetImage = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { title } = useSnippetContent();
  const status = useSnippetStore((state) => state.status);
  const setStatus = useSnippetStore.setState;
  const IMAGE_NAME = title ? `${title}.png` : "code.png";

  const handleDownload = async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const $codeBlock = document.querySelector("#codeBlock") as HTMLDivElement;
    const codeBlockEditor = createCodeBlockEditor($codeBlock);

    try {
      setStatus({ status: "loading" });

      codeBlockEditor.resizing();

      const canvas = await createCanvasElement($codeBlock, 5);

      const blob = await canvasToBlob(canvas);

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = IMAGE_NAME;
      link.click();

      setStatus({ status: "succeed" });
    } catch (error) {
      console.error(error);
      setStatus({ status: "fail" });
    } finally {
      codeBlockEditor.restore();

      timerRef.current = setTimeout(() => {
        setStatus({ status: "idle" });
      }, 1000);
    }
  };

  return { status, handleDownload };
};
