import { createStore } from "@/shared/lib/store";
type Status = "loading" | "idle" | "succeed" | "fail";

export interface SnippetState {
  text: string;
  status: Status;
  title: string;
}

const SNIPPET_INITIAL_STATE: SnippetState = {
  text: `import React from 'react';

type Props = {
  message: string;
};

const SimpleComponent: React.FC<Props> = ({ message }) => {
  return <div>{message}</div>;
};

export default SimpleComponent;`,

  status: "idle",
  title: "",
};

export const useSnippetStore = createStore(SNIPPET_INITIAL_STATE);
