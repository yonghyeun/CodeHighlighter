import styles from './setting.module.css';

import {
  Language,
  Theme,
  Title,
  ShowLineNumbers,
  AddLine,
  RemoveLine,
  PointLine,
} from './components/settingFormItems';

const SettingBox = () => {
  return (
    <form className={styles.container}>
      <Language />
      <Theme />
      <Title />
      <ShowLineNumbers />
      <AddLine />
      <RemoveLine />
      <PointLine />
    </form>
  );
};

export default SettingBox;
