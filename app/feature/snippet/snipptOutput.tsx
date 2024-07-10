'use client';

import { useAppSelector } from '@/hooks/redux-hooks';
import { useEffect, useState } from 'react';
import styles from './snippet.module.css';
import { preprocessMarkdown, processMarkdown } from './utils/markdownProcessor';

const SnippetOutput = () => {
  const { text: snippetInput } = useAppSelector((state) => state.snippet);

  const snippetSetting = useAppSelector((state) => state.setting);
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    (async function () {
      const markdown = preprocessMarkdown(snippetInput, snippetSetting);
      const result = await processMarkdown(markdown, snippetSetting.theme);
      setHtmlContent(result);
    })();
  }, [snippetInput, snippetSetting]);

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
