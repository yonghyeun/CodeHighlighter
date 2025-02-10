import { useEffect, useRef } from "react";
import { useSnippetStore, SnippetState } from "../model";
import { insertTabSpace } from "./utils/insertTabSpace";

export const useSnippetTextArea = (
  key: Extract<keyof SnippetState, "text" | "title">
) => {
  const state = useSnippetStore((state) => state[key]);
  const textArea = useRef<HTMLTextAreaElement>(null);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    useSnippetStore.setState({ [key]: event.target.value });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Tab") {
      event.preventDefault();

      if (!textArea.current) {
        return;
      }

      const { newTextAreaValue, newCursorPosition } = insertTabSpace(
        textArea.current,
        2
      );

      useSnippetStore.setState({ [key]: newTextAreaValue });

      textArea.current.value = newTextAreaValue;
      textArea.current.setSelectionRange(newCursorPosition, newCursorPosition);
    }
  };

  // textArea의 높이를 자동으로 조절하는 효과를 위한 useEffect
  useEffect(() => {
    if (!textArea.current) {
      return;
    }
    textArea.current.style.height = "auto";
    textArea.current.style.height = `${textArea.current.scrollHeight}px`;
  }, [state]);

  return {
    ref: textArea,
    defaultValue: state,
    onChange,
    onKeyDown,
  };
};
