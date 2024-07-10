import { useAppSelector } from '@/hooks/redux-hooks';

import styles from './snippet.module.css';

const SnippetOutput = () => {
  const { text: snippetInput } = useAppSelector((state) => state.snippet);

  return (
    <section className={styles.snippetOutputWrapper}>
      <div className={styles.snippetOutput}>{snippetInput}</div>
    </section>
  );
};

export default SnippetOutput;
