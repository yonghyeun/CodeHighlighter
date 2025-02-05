import { useCopySnippetImage } from "../lib";

export const CopySnippetToClipboardButton = () => {
  const { status, handleCopy } = useCopySnippetImage();

  return (
    <button
      className="bg-slate-700 rounded-xl text-xl  flex items-center px-4 py-2  mb-2 transition-transform duration-300 ease-in-out hover:scale-110 
      relative"
      onClick={handleCopy}
    >
      <StatusIcon status={status} />
      <p className="ml-2 text-sm">Copy Image</p>
    </button>
  );
};

/* 로딩 시간이 매우 짧으니 loading 상태는 빼자 */
export type Status = "idle" | "succeed" | "fail";

const StatusIcon = ({ status }: { status: Status }) => {
  switch (status) {
    case "idle":
      return <p className="hidden"></p>;
    case "succeed":
      return <p className="text-sm mr-2">🙆</p>;
    case "fail":
      return <p className="text-sm mr-2">🙅‍♂️</p>;
  }
};
