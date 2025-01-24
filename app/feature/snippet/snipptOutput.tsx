'use client';

import styles from './snippet.module.css';

import { useAppSelector } from '@/hooks/redux-hooks';
import { useEffect, useState } from 'react';
import { preprocessMarkdown, processMarkdown } from './utils/markdownProcessor';

import { LoadingIcon } from '@/components/Icons';

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
    if (!htmlContent) return;

    const $codeBlock = document.querySelector('code');
    if (!$codeBlock) return;

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

    $codeBlock.innerHTML = '';
    newChildren.forEach((newChild) => {
      $codeBlock.appendChild(newChild);
    });

    const $snippetOutput = $codeBlock.parentElement
      ?.parentElement as HTMLElement;

    setHtmlContent($snippetOutput?.outerHTML);
  }, [htmlContent, showLineNumbers]);

  if (!htmlContent) {
    return (
      <section className={styles.snippetOutputWrapper}>
        <div className={styles.loading}>
          <LoadingIcon />
        </div>
      </section>
    );
  }

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
