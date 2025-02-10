export const insertTabSpace = (
  { selectionStart, selectionEnd, value }: HTMLTextAreaElement,
  tabSize: number
) => {
  const beforeSelection = value.slice(0, selectionStart);
  const afterSelection = value.slice(selectionEnd);
  const newTextAreaValue = `${beforeSelection}${" ".repeat(
    tabSize
  )}${afterSelection}`;

  const newCursorPosition = selectionStart + tabSize;

  return {
    newTextAreaValue,
    newCursorPosition,
  };
};
