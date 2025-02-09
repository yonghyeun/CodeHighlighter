import { toCanvas } from "html-to-image";
import { useInteractionStatusStore } from "../model";
import { useRef } from "react";

export const DownloadSnippetButton = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const setStatus = useInteractionStatusStore.setState;

  const handleDownload = async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setStatus({ status: "loading" });
    const $codeBlock = document.querySelector("#codeBlock") as HTMLDivElement;

    /* 스크롤바 없애기 전 저장 */
    const originalWidth = $codeBlock.style.width;
    const originalOverflowX = $codeBlock.style.overflowX;
    /* 스크롤바 없애기  */
    $codeBlock.style.width = "fit-content";
    $codeBlock.style.overflow = "visible";

    const $codeBlockTitle = document.querySelector(
      "#codeBlockTitle"
    ) as HTMLInputElement;

    /* 타이틀이 존재하지 않는다면 placeHolder가 나타나지 않도록 visibility 조절 */

    if ($codeBlockTitle.value.length < 1) {
      $codeBlockTitle.style.visibility = "hidden";
    }

    const canvas = await toCanvas($codeBlock, {
      pixelRatio: 5,
    });

    canvas.toBlob((blob) => {
      if (!blob) {
        /* 스크롤바 복원  */
        $codeBlock.style.width = originalWidth;
        $codeBlock.style.overflowX = originalOverflowX;

        if ($codeBlockTitle.value.length < 1) {
          $codeBlockTitle.style.visibility = "visible";
        }

        setStatus({ status: "fail" });
        timerRef.current = setTimeout(() => {
          setStatus({ status: "idle" });
        }, 1000);
      } else {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "code.png";
        link.click();

        setStatus({ status: "succeed" });
        timerRef.current = setTimeout(() => {
          setStatus({ status: "idle" });
        }, 1000);

        /* 스크롤바 복원  */
        $codeBlock.style.width = originalWidth;
        $codeBlock.style.overflowX = originalOverflowX;

        if ($codeBlockTitle.value.length < 1) {
          $codeBlockTitle.style.visibility = "visible";
        }
      }
    }, "code/png");
  };

  return (
    <button
      className="bg-slate-700 rounded-xl text-sm px-4 py-2 flex flex-col justify-center mb-2 transition-transform duration-300 ease-in-out hover:scale-110      "
      onClick={handleDownload}
    >
      Download Image
    </button>
  );
};
