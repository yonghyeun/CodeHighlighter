import { useAppDispatch } from '@/hooks/redux-hooks';
import { changeText } from './snippetSlice';

import styles from './snippet.module.css';

const SnippetInput = () => {
  const dispatch = useAppDispatch();

  const handleCodeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(changeText(event.target.value));
  };

  return (
    <textarea className={styles.snippetInput} onChange={handleCodeInput} />
  );
};

export default SnippetInput;
