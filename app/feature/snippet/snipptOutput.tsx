'use client';

import { useAppSelector } from '@/hooks/redux-hooks';
import { useEffect, useState } from 'react';
import styles from './snippet.module.css';
import { preprocessMarkdown, processMarkdown } from './utils/markdownProcessor';

const SnippetOutput = () => {
  const { text: snippetInput } = useAppSelector((state) => state.snippet);
  const { showLineNumbers } = useAppSelector((state) => state.setting);

  const snippetSetting = useAppSelector((state) => state.setting);
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    (async function () {
      const markdown = preprocessMarkdown(snippetInput, snippetSetting);
      const result = await processMarkdown(markdown, snippetSetting.theme);
      setHtmlContent(result);
    })();
  }, [snippetInput, snippetSetting]);

  useEffect(() => {
    // ! Actual DOM 조작
    const $codeBlock = document.querySelector('code');

    if (!$codeBlock) {
      return;
    }

    const children = Array.from($codeBlock.children);

    const newChildren = children.map((child, idx) => {
      const $lineWrapper = document.createElement('div');
      $lineWrapper.className = 'lineWrapper';

      const $lineNumber = document.createElement('div');
      const lineNumber = Number(showLineNumbers || 1) + idx;
      $lineNumber.textContent = String(lineNumber);
      $lineNumber.className = 'lineNumber';

      const codeSpan = child.matches('span[data-line]')
        ? child
        : (child.lastChild as HTMLSpanElement);

      $lineWrapper.appendChild($lineNumber);
      $lineWrapper.appendChild(codeSpan);

      return $lineWrapper;
    });

    while ($codeBlock.firstChild) {
      $codeBlock.removeChild($codeBlock.firstChild);
    }

    newChildren.forEach((newChild) => {
      $codeBlock.appendChild(newChild);
    });

    const $snippetOutput = $codeBlock.parentElement
      ?.parentElement as HTMLElement;

    setHtmlContent($snippetOutput?.outerHTML);
  });

  return (
    <section className={styles.snippetOutputWrapper}>
      <div
        className={styles.snippetOutput}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div>
    </section>
  );
};

export default SnippetOutput;
