import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import styles from './setting.module.css';
import { changeSetting } from './settingSlice';

const SettingBox = () => {
  const {
    addLineColor,
    title,
    removeLineColor,
    pointingColor,
    theme,
    language,
  } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();

  return (
    <form className={styles.container}>
      <div className='flex'>
        <label htmlFor='language'>language</label>
        <select
          defaultValue={language}
          onChange={(e) => {
            dispatch(changeSetting({ key: 'language', value: e.target.value }));
          }}
        >
          <option value='tsx'>tsx</option>
        </select>
      </div>
      <div className='flex'>
        <label htmlFor='theme'>Theme</label>
        <select
          defaultValue={theme}
          onChange={(e) => {
            dispatch(changeSetting({ key: 'theme', value: e.target.value }));
          }}
        >
          <option value='marterial-darker-theme'>marterial-darker-theme</option>
        </select>
      </div>
      <div className='flex'>
        <label htmlFor='Title'>Title</label>
        <input
          type='text'
          id='Title'
          placeholder='@/lib/model.tsx'
          onChange={(e) => {
            dispatch(
              changeSetting({
                key: 'title',
                value: e.target.value,
              }),
            );
          }}
        />
      </div>
      <div className='flex'>
        <label htmlFor='showLineNumbers'>Show Line Number</label>
        <input
          type='text'
          id='showLineNumbers'
          placeholder='ex : 1,2,5-10'
          onChange={(e) => {
            dispatch(
              changeSetting({
                key: 'showLineNumbers',
                value: e.target.value,
              }),
            );
          }}
        />
      </div>
      <div className='flex'>
        <label htmlFor='addLineColor'>Add Line Color</label>
        <input
          type='color'
          id='addLineColor'
          defaultValue={addLineColor}
          onChange={(event) => {
            dispatch(
              changeSetting({
                key: 'addLineColor',
                value: event.target.value,
              }),
            );
          }}
        />
        <p>{addLineColor}</p>
      </div>
      <div className={styles.colorsGrid}>
        <label htmlFor='removeLineColor'>Remove Line Color</label>
        <input
          type='color'
          id='removeLineColor'
          defaultValue={removeLineColor}
          onChange={(event) => {
            dispatch(
              changeSetting({
                key: 'removeLineColor',
                value: event.target.value,
              }),
            );
          }}
        />
        <p>{removeLineColor}</p>
      </div>
      <div className='flex'>
        <label htmlFor='pointingColor'>Point Line Color</label>
        <input
          type='color'
          id='pointingColor'
          defaultValue={pointingColor}
          onChange={(event) => {
            dispatch(
              changeSetting({
                key: 'pointingColor',
                value: event.target.value,
              }),
            );
          }}
        />
        <p>{pointingColor}</p>
      </div>
    </form>
  );
};

export default SettingBox;
