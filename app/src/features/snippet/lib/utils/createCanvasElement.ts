import html2canvas from "html2canvas";

export const createCanvasElement = (
  element: HTMLElement,
  pixelRatio: number = 2
) => {
  return html2canvas(element, {
    scale: pixelRatio,
    backgroundColor: null,
  });
};
