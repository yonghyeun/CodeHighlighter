import { useEffect, useRef } from "react";
import { useSnippetStore } from "../model";
import { insertTabSpace } from "./utils/insertTabSpace";

export const useSnippetTextArea = () => {
  const text = useSnippetStore((state) => state.text);
  const textArea = useRef<HTMLTextAreaElement>(null);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    useSnippetStore.setState({ text: event.target.value });
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

      useSnippetStore.setState({ text: newTextAreaValue });

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
  }, [text]);

  return {
    ref: textArea,
    defaultValue: text,
    onChange,
    onKeyDown,
  };
};
