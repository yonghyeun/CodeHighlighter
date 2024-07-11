import { remark } from 'remark';
import html from 'remark-html';
import remarkRehype from 'remark-rehype';

import type { SettingInitalState } from '@/feature/setting/settingSlice';
import type { Theme } from 'rehype-pretty-code';
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

  return `\`\`\`${language} {${relatvieAdd}}#add {${relativeRemove}}#remove {${relativePointing}}#pointing  showLineNumbers{${showLineNumbers}}\n${
    title ? `// ${title}\n` : ''
  }${text}\n\`\`\``;
};

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
      theme: theme as Theme,
    })
    .use(rehypeStringify)
    .process(markDown);

  return processedContent.toString();
};
