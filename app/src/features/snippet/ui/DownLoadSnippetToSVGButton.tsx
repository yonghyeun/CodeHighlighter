import { toSvg } from "html-to-image";

export const DownLoadSnippetToSVGButton = () => {
  const handleDownload = async () => {
    const $codeBlock = document.querySelector("#codeBlock") as HTMLDivElement;

    /* 스크롤바 없애기 전 저장 */
    const originalWidth = $codeBlock.style.width;
    const originalOverflowX = $codeBlock.style.overflowX;
    try {
      /* 스크롤바 없애기  */
      $codeBlock.style.width = "fit-content";
      $codeBlock.style.overflow = "visible";

      const svgData = await toSvg($codeBlock, {
        quality: 1,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.href = svgData;
      link.download = "code.svg";
      link.click();
    } catch (error) {
      console.error(error);
    } finally {
      /* 스크롤바 복원  */
      $codeBlock.style.width = originalWidth;
      $codeBlock.style.overflowX = originalOverflowX;
    }
  };

  return (
    <button
      className="bg-slate-700 rounded-xl text-sm px-4 py-2  mb-2 transition-transform duration-300 ease-in-out hover:scale-110      "
      onClick={handleDownload}
    >
      Download Image
    </button>
  );
};
