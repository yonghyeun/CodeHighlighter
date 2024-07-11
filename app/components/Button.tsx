import { CopyIcon, SaveIcon } from './Icons';
import * as htmlToImage from 'html-to-image';

export const CopyButton = () => {
  return (
    <button className='hover:animate-bounce  rounded-xl text-2xl  flex items-center px-4 py-1 bg-[#61dafb] '>
      <CopyIcon />
      <p className='ml-2 text-lg'>Copy</p>
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

        /* beforeElement 삽입하기 */
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
      className='hover-custom border text-xl flex items-center px-2 py-1'
      onClick={handleDownload}
    >
      <SaveIcon />
      <p className='ml-2 text-sm'>Download Image</p>
    </button>
  );
};
