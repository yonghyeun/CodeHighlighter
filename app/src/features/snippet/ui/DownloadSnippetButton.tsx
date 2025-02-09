import { useSaveSnippetImage } from "../lib";

export const DownloadSnippetButton = () => {
  const { status, handleDownload } = useSaveSnippetImage();

  return (
    <button
      className="bg-slate-700 rounded-xl text-sm px-4 py-2 flex flex-col justify-center mb-2 transition-transform duration-300 ease-in-out hover:scale-110      "
      onClick={handleDownload}
      disabled={status === "loading"}
    >
      Download Image
    </button>
  );
};
