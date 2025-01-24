import { remark } from 'remark';
import html from 'remark-html';
import remarkRehype from 'remark-rehype';

import type { SettingInitalState } from '@/feature/setting/settingSlice';
import type { BundledTheme } from 'shiki';

const RelativeLineNumber = (
  showLineNumber: SettingInitalState['showLineNumbers'],
  colorLineString: string,
) => {
  // 1. colorLineString 을 숫자들로 변경
  const lines = colorLineString.split(',').flatMap((str) => {
    if (str.includes('-')) {
      const [start, end] = str.split('-').map(Number);
      return Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
    } else {
      return Number(str);
    }
  });
  // 2. colorLineNumber - showLineNumber + 1 로 변경하기
  const relatvieLines = lines.map((line) => line - Number(showLineNumber) + 1);
  // 3. 문자열 형태로 변경
  return relatvieLines.join(',');
};

export const preprocessMarkdown = (
  text: string,
  setting: SettingInitalState,
) => {
  const {
    showLineNumbers,
    title,
    language,
    addLineNumber,
    removeLineNumber,
    pointLineNumber,
  } = setting;

  const relatvieAdd = RelativeLineNumber(showLineNumbers || '1', addLineNumber);
  const relativeRemove = RelativeLineNumber(
    showLineNumbers || '1',
    removeLineNumber,
  );
  const relativePointing = RelativeLineNumber(
    showLineNumbers || '1',
    pointLineNumber,
  );

  return `\`\`\`${language} {${relatvieAdd}}#add {${relativeRemove}}#remove {${relativePointing}}#pointing\n${
    title ? `// ${title}\n` : ''
  }${text}\n\`\`\``;
};

/**
 * ! processMarkdown 은 테마가 변경되어 실행 될 때 마다 shiki highlighter 인스턴스를 생성한다.
 * ! 사실은 getSingltoneHighlighter 메소드를 이용하여 하이라이터를 넣어줘야하는데
 * ! 공식문서를 뒤져봐도 문서가 잘 나오지 않아 그냥 사용하도록 했다.
 * ! 테마 개수가 20개인데 20개의 인스턴스가 존재한다고 해도 memory leak 문제가 심각하진 않을 것 같다.
 */
export const processMarkdown = async (
  markDown: string,
  theme: SettingInitalState['theme'],
) => {
  const { default: rehypePrettyCode } = await import('rehype-pretty-code');
  const { default: rehypeStringify } = await import('rehype-stringify');

  const processedContent = await remark()
    .use(html)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: theme as BundledTheme,
    })
    .use(rehypeStringify)
    .process(markDown);

  return processedContent.toString();
};
