import { toCanvas } from "html-to-image";

export const DownloadSnippetButton = () => {
  const handleDownload = async () => {
    const $codeBlock = document.querySelector("#codeBlock") as HTMLDivElement;

    /* 스크롤바 없애기 전 저장 */
    const originalWidth = $codeBlock.style.width;
    const originalOverflowX = $codeBlock.style.overflowX;
    /* 스크롤바 없애기  */
    $codeBlock.style.width = "fit-content";
    $codeBlock.style.overflow = "visible";

    const canvas = await toCanvas($codeBlock, {
      pixelRatio: 5,
    });

    canvas.toBlob((blob) => {
      if (blob) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "code.png";
        link.click();
      }
    }, "code/png");
    /* 스크롤바 복원  */
    $codeBlock.style.width = originalWidth;
    $codeBlock.style.overflowX = originalOverflowX;
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
