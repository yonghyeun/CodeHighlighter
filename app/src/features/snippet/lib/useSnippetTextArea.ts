import { useAppDispatch, useAppSelector } from "@/redux/lib";
import { useEffect, useRef } from "react";
import { changeText } from "../model";

export const useSnippetTextArea = () => {
  const text = useAppSelector((state) => state.snippet.text);

  const dispatch = useAppDispatch();
  const textArea = useRef<HTMLTextAreaElement>(null);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(changeText(event.target.value));
  };

  // textArea의 높이를 자동으로 조절하는 효과를 위한 useEffect
  useEffect(() => {
    if (!textArea.current) {
      return;
    }
    textArea.current.style.height = "auto";
    textArea.current.style.height = `${textArea.current.scrollHeight}px`;
  }, [text]);

  return {
    ref: textArea,
    defaultValue: text,
    onChange,
  };
};
