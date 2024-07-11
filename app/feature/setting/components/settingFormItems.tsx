'use client';

import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { useSyncronizeLocalStorage } from '@/hooks/synchronize';

import { changeSetting } from '../settingSlice';
import { debounce } from '@/feature/setting/utils';

import { CodeLanguage, BundleTheme } from '@/constant/markdown';

export const Language = () => {
  const { language } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();

  useSyncronizeLocalStorage('language', language, (storedValue) => {
    dispatch(changeSetting({ key: 'language', value: storedValue }));
  });

  return (
    <div className='flex'>
      <label htmlFor='language'>language</label>
      <select
        value={language}
        onChange={(e) => {
          dispatch(changeSetting({ key: 'language', value: e.target.value }));
        }}
      >
        {CodeLanguage.map((lang, idx) => (
          <option key={idx} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export const Theme = () => {
  const { theme } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();

  useSyncronizeLocalStorage('theme', theme, (storedValue) => {
    dispatch(changeSetting({ key: 'theme', value: storedValue }));
  });

  return (
    <div className='flex'>
      <label htmlFor='theme'>Theme</label>
      <select
        value={theme}
        onChange={(e) => {
          dispatch(changeSetting({ key: 'theme', value: e.target.value }));
        }}
      >
        {BundleTheme.map((bundleTheme, idx) => (
          <option key={idx} value={bundleTheme}>
            {bundleTheme}
          </option>
        ))}
      </select>
    </div>
  );
};

export const Title = () => {
  const dispatch = useAppDispatch();
  return (
    <div className='flex'>
      <label htmlFor='Title'>First Line Comment</label>
      <input
        type='text'
        id='Title'
        placeholder='My Awesome Code'
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
  );
};

export const ShowLineNumbers = () => {
  const { showLineNumbers } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();

  return (
    <div className='flex'>
      <label htmlFor='showLineNumbers'>Show Line Number</label>
      <input
        type='text'
        id='showLineNumbers'
        defaultValue={showLineNumbers}
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
  );
};

export const AddLine = () => {
  const { addLineColor, addLineNumber } = useAppSelector(
    (state) => state.setting,
  );
  const dispatch = useAppDispatch();

  useSyncronizeLocalStorage('addLineColor', addLineColor, (storedValue) => {
    dispatch(changeSetting({ key: 'addLineColor', value: storedValue }));
  });

  const buttonRef = useRef<string>('');
  const handleChange = debounce(() => {
    dispatch(changeSetting({ key: 'addLineColor', value: buttonRef.current }));
  }, 100);

  return (
    <div className='flex'>
      <div className='flex flex-1 items-center'>
        <label htmlFor='addLineColor'>Add Line Color</label>
        <input
          type='color'
          value={addLineColor}
          onChange={(e) => {
            buttonRef.current = e.target.value;
            handleChange();
          }}
        />
        <p>{addLineColor}</p>
      </div>
      <div className='flex flex-1'>
        <label htmlFor='addLineNumber'>Add Line Number</label>
        <input
          type='text'
          id='addLineNumber'
          defaultValue={addLineNumber}
          placeholder='ex : 1,2,5-10'
          onChange={(e) => {
            dispatch(
              changeSetting({ key: 'addLineNumber', value: e.target.value }),
            );
          }}
        />
      </div>
    </div>
  );
};

export const RemoveLine = () => {
  const { removeLineColor, removeLineNumber } = useAppSelector(
    (state) => state.setting,
  );
  const dispatch = useAppDispatch();

  useSyncronizeLocalStorage(
    'removeLineColor',
    removeLineColor,
    (storedValue) => {
      dispatch(changeSetting({ key: 'removeLineColor', value: storedValue }));
    },
  );

  const buttonRef = useRef<string>('');
  const handleChange = debounce(() => {
    dispatch(
      changeSetting({ key: 'removeLineColor', value: buttonRef.current }),
    );
  }, 100);

  return (
    <div className='flex'>
      <div className='flex flex-1 items-center'>
        <label htmlFor='removeLineColor'>Remove Line Color</label>
        <input
          type='color'
          value={removeLineColor}
          onChange={(e) => {
            buttonRef.current = e.target.value;
            handleChange();
          }}
        />
        <p>{removeLineColor}</p>
      </div>
      <div className='flex flex-1'>
        <label htmlFor='removeLineNumber'>Remove Line Number</label>
        <input
          type='text'
          id='removeLineNumber'
          defaultValue={removeLineNumber}
          placeholder='ex : 1,2,5-10'
          onChange={(e) => {
            dispatch(
              changeSetting({ key: 'removeLineNumber', value: e.target.value }),
            );
          }}
        />
      </div>
    </div>
  );
};

export const PointLine = () => {
  const { pointingColor, pointLineNumber } = useAppSelector(
    (state) => state.setting,
  );
  const dispatch = useAppDispatch();

  useSyncronizeLocalStorage('pointingColor', pointingColor, (storedValue) => {
    dispatch(changeSetting({ key: 'pointingColor', value: storedValue }));
  });

  const buttonRef = useRef<string>('');
  const handleChange = debounce(() => {
    dispatch(changeSetting({ key: 'pointingColor', value: buttonRef.current }));
  }, 100);

  return (
    <div className='flex'>
      <div className='flex flex-1 items-center'>
        <label htmlFor='pointingColor'>Point Line Color</label>
        <input
          type='color'
          value={pointingColor}
          onChange={(e) => {
            buttonRef.current = e.target.value;
            handleChange();
          }}
        />
        {/* TODO hydration 문제 고치기 */}
        <p>{pointingColor}</p>
      </div>
      <div className='flex flex-1'>
        <label htmlFor='pointLineNumber'>Point Line Number</label>
        <input
          type='text'
          id='pointLineNumber'
          defaultValue={pointLineNumber}
          placeholder='ex : 1,2,5-10'
          onChange={(e) => {
            dispatch(
              changeSetting({ key: 'pointLineNumber', value: e.target.value }),
            );
          }}
        />
      </div>
    </div>
  );
};
