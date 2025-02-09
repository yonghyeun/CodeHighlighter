import { useCopySnippetImage } from "../lib";

export const CopySnippetToClipboardButton = () => {
  const { status, handleCopy } = useCopySnippetImage();

  return (
    <button
      className="bg-slate-700 rounded-xl text-xl  flex items-center px-4 py-2  mb-2 transition-transform duration-300 ease-in-out hover:scale-110 
      relative"
      onClick={handleCopy}
      disabled={status === "loading"}
    >
      Copy Image
    </button>
  );
};
