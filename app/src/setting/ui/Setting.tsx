"use client";

import React, { PropsWithChildren, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/lib";
import { changeSetting, persistStoreSettingKeys } from "../model";
import { CodeLanguage, BundleTheme } from "../config";
import styles from "./styles.module.css";

const Container: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    persistStoreSettingKeys.forEach((key) => {
      const value = localStorage.getItem(key);

      if (value) {
        dispatch(
          changeSetting({
            key,
            value,
          })
        );
      }
    });
  }, [dispatch]);

  return <section className={styles.container}>{children}</section>;
};

const Language = () => {
  const { language } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();

  return (
    <div className="flex">
      <label htmlFor="language">language</label>
      <select
        value={language}
        onChange={(e) => {
          dispatch(
            changeSetting({
              key: "language",
              value: e.target.value,
            })
          );
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

const Theme = () => {
  const { theme } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();

  return (
    <div className="flex">
      <label htmlFor="theme">Theme</label>
      <select
        value={theme}
        onChange={(e) => {
          dispatch(
            changeSetting({
              key: "theme",
              value: e.target.value,
            })
          );
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

const Title = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex">
      <label htmlFor="Title">First Line Comment</label>
      <input
        type="text"
        id="Title"
        placeholder="My Awesome Code"
        autoComplete="off"
        onChange={(e) => {
          dispatch(
            changeSetting({
              key: "title",
              value: e.target.value,
            })
          );
        }}
      />
    </div>
  );
};

const ShowLineNumbers = () => {
  const { showLineNumbers } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();

  return (
    <div className="flex">
      <label htmlFor="showLineNumbers">Show Line Number</label>
      <input
        type="text"
        id="showLineNumbers"
        defaultValue={showLineNumbers}
        autoComplete="off"
        onChange={(e) => {
          dispatch(
            changeSetting({
              key: "showLineNumbers",
              value: e.target.value,
            })
          );
        }}
      />
    </div>
  );
};

const AddLine = () => {
  const { addLineColor, addLineNumber } = useAppSelector(
    (state) => state.setting
  );
  const dispatch = useAppDispatch();

  return (
    <div className="flex">
      <div className="flex flex-1 items-center">
        <label htmlFor="addLineColor">Add Line Color</label>
        <input
          type="color"
          value={addLineColor}
          onChange={({ target }) => {
            dispatch(
              changeSetting({ key: "addLineColor", value: target.value })
            );
          }}
          id="addLineColor"
        />
        <p>{addLineColor}</p>
      </div>
      <div className="flex flex-1">
        <label htmlFor="addLineNumber">Add Line Number</label>
        <input
          type="text"
          id="addLineNumber"
          defaultValue={addLineNumber}
          placeholder="ex : 1,2,5-10"
          autoComplete="off"
          onChange={({ target }) => {
            changeSetting({ key: "addLineNumber", value: target.value });
          }}
        />
      </div>
    </div>
  );
};

const RemoveLine = () => {
  const { removedLineColor, removedLineNumber } = useAppSelector(
    (state) => state.setting
  );
  const dispatch = useAppDispatch();

  return (
    <div className="flex">
      <div className="flex flex-1 items-center">
        <label htmlFor="removedLineColor">Remove Line Color</label>
        <input
          type="color"
          value={removedLineColor}
          onChange={({ target }) => {
            dispatch(
              changeSetting({
                key: "removedLineColor",
                value: target.value,
              })
            );
          }}
          id="removedLineColor"
        />
        <p>{removedLineColor}</p>
      </div>
      <div className="flex flex-1">
        <label htmlFor="removedLineNumber">Remove Line Number</label>
        <input
          type="text"
          id="removedLineNumber"
          defaultValue={removedLineNumber}
          placeholder="ex : 1,2,5-10"
          autoComplete="off"
          onChange={({ target }) => {
            dispatch(
              changeSetting({
                key: "removedLineNumber",
                value: target.value,
              })
            );
          }}
        />
      </div>
    </div>
  );
};

const PointLine = () => {
  const { pointingLineColor, pointingLineNumber } = useAppSelector(
    (state) => state.setting
  );
  const dispatch = useAppDispatch();

  return (
    <div className="flex">
      <div className="flex flex-1 items-center">
        <label htmlFor="pointingLineColor">Point Line Color</label>
        <input
          type="color"
          value={pointingLineColor}
          onChange={({ target }) => {
            dispatch(
              changeSetting({
                key: "pointingLineColor",
                value: target.value,
              })
            );
          }}
          id="pointingLineColor"
        />
        <p>{pointingLineColor}</p>
      </div>
      <div className="flex flex-1">
        <label htmlFor="pointingLineNumber">Point Line Number</label>
        <input
          type="text"
          id="pointingLineNumber"
          defaultValue={pointingLineNumber}
          placeholder="ex : 1,2,5-10"
          autoComplete="off"
          onChange={({ target }) => {
            dispatch(
              changeSetting({
                key: "pointingLineNumber",
                value: target.value,
              })
            );
          }}
        />
      </div>
    </div>
  );
};

export const Setting = Object.assign(Container, {
  Language,
  Theme,
  Title,
  ShowLineNumbers,
  AddLine,
  RemoveLine,
  PointLine,
});
