export const createCodeBlockEditor = (
  codeBlock: HTMLDivElement,
  title: HTMLInputElement
) => {
  const originalWidth = codeBlock.style.width;
  const originalOverflowX = codeBlock.style.overflowX;

  const resizing = () => {
    title.style.visibility = "hidden";

    codeBlock.style.width = "fit-content";
    codeBlock.style.overflow = "visible";
  };

  const restore = () => {
    codeBlock.style.width = originalWidth;
    codeBlock.style.overflowX = originalOverflowX;

    title.style.visibility = "visible";
  };

  return {
    resizing,
    restore,
  };
};
