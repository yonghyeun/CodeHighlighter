import { CopyIcon, SaveIcon } from './Icons';
import * as htmlToImage from 'html-to-image';

export const CopyButton = () => {
  const handleCopy = () => {
    (async function () {
      const $codeBlock = document.querySelector('pre');
      if (!$codeBlock) {
        return;
      }

      /* 스크롤바 없애기 전 저장 */
      const originalWidth = $codeBlock.style.width;
      const originalOverflow = $codeBlock.style.overflow;

      try {
        /* 스크롤바 없애기  */
        $codeBlock.style.width = 'fit-content';
        $codeBlock.style.overflow = 'visible';

        const canvas = await htmlToImage.toCanvas($codeBlock);

        canvas.toBlob(async (blob) => {
          if (blob) {
            const clipboardItem = new ClipboardItem({ 'image/png': blob });
            await navigator.clipboard.write([clipboardItem]);
            alert('Image copied to Clipboard');
          } else {
            throw new Error('faild to create blob');
          }
        }, 'image/png');
      } catch (error) {
        console.error(error);
      } finally {
        /* 스크롤바 복원  */
        $codeBlock.style.width = originalWidth;
        $codeBlock.style.overflow = originalOverflow;
      }
    })();
  };

  return (
    <button
      className='bg-slate-700 rounded-xl text-xl  flex items-center px-4 py-2  mb-2 transition-transform duration-300 ease-in-out hover:scale-110 
    '
      onClick={handleCopy}
    >
      <CopyIcon />
      <p className='ml-2 text-sm'>Copy Image</p>
    </button>
  );
};

export const DownLoadButton = () => {
  const handleDownload = () => {
    (async function () {
      const $codeBlock = document.querySelector('pre');
      if (!$codeBlock) {
        return;
      }

      /* 스크롤바 없애기 전 저장 */
      const originalWidth = $codeBlock.style.width;
      const originalOverflow = $codeBlock.style.overflow;

      try {
        /* 스크롤바 없애기  */
        $codeBlock.style.width = 'fit-content';
        $codeBlock.style.overflow = 'visible';

        const dataUrl = await htmlToImage.toPng($codeBlock);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'code.png';
        link.click();
      } catch (error) {
        console.error(error);
      } finally {
        /* 스크롤바 복원  */
        $codeBlock.style.width = originalWidth;
        $codeBlock.style.overflow = originalOverflow;
      }
    })();
  };

  return (
    <button
      className='bg-slate-700 rounded-xl text-xl  flex items-center px-4 py-2  mb-2 transition-transform duration-300 ease-in-out hover:scale-110'
      onClick={handleDownload}
    >
      <SaveIcon />
      <p className='ml-2 text-sm'>Download Image</p>
    </button>
  );
};
