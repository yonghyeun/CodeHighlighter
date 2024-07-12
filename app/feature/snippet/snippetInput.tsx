import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { changeText } from './snippetSlice';

import styles from './snippet.module.css';

const SnippetInput = () => {
  const { text: snippetInput } = useAppSelector((state) => state.snippet);
  const dispatch = useAppDispatch();

  const handleCodeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(changeText(event.target.value));
  };

  return (
    <>
      <label htmlFor='snippetInput'></label>
      <textarea
        className={styles.snippetInput}
        onChange={handleCodeInput}
        defaultValue={snippetInput}
        id='sinippetInput'
      />
    </>
  );
};

export default SnippetInput;
