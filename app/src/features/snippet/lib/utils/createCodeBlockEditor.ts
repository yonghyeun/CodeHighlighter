export const createCodeBlockEditor = (codeBlock: HTMLDivElement) => {
  const originalWidth = codeBlock.style.width;
  const originalOverflowX = codeBlock.style.overflowX;

  const resizing = () => {
    codeBlock.style.width = "fit-content";
    codeBlock.style.overflow = "visible";
  };

  const restore = () => {
    codeBlock.style.width = originalWidth;
    codeBlock.style.overflowX = originalOverflowX;
  };

  return {
    resizing,
    restore,
  };
};
