export const canvasToBlob = (
  canvasElement: HTMLCanvasElement
): Promise<Blob> => {
  return new Promise((res, rej) => {
    canvasElement.toBlob((blob) => {
      if (blob) {
        res(blob);
      } else {
        rej("Failed to create blob");
      }
    });
  });
};
