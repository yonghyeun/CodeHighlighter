import { toCanvas } from "html-to-image";
import { useRef } from "react";
import { useInteractionStatusStore } from "../model";

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
    const $codeBlockTitle = document.querySelector(
      "#codeBlockTitle"
    ) as HTMLInputElement;

    /* 스크롤바 없애기 전 저장 */
    const originalWidth = $codeBlock.style.width;
    const originalOverflowX = $codeBlock.style.overflowX;

    /* 타이틀이 존재하지 않는다면 placeHolder가 나타나지 않도록 visibility 조절 */
    if ($codeBlockTitle.value.length < 1) {
      $codeBlockTitle.style.visibility = "hidden";
    }

    $codeBlock.style.width = "fit-content";
    $codeBlock.style.overflow = "visible";

    const canvas = await toCanvas($codeBlock, {
      pixelRatio: 5,
    });

    canvas.toBlob(async (blob) => {
      if (!blob) {
        setStatus({ status: "fail" });
        statusTimerRef.current = setTimeout(() => {
          setStatus({ status: "idle" });
        }, 1000);
        return;
      }

      const clipboardItem = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([clipboardItem]);
      setStatus({ status: "succeed" });

      $codeBlock.style.width = originalWidth;
      $codeBlock.style.overflowX = originalOverflowX;

      if ($codeBlockTitle.value.length < 1) {
        $codeBlockTitle.style.visibility = "visible";
      }

      statusTimerRef.current = setTimeout(() => {
        setStatus({ status: "idle" });
      }, 1000);
    }, "image/png");
  };

  return { status, handleCopy };
};
