import { createStore } from "@/shared/lib/store";
type Status = "loading" | "idle" | "succeed" | "fail";

const SNIPPET_INITIAL_STATE: { text: string; status: Status } = {
  text: `import React from 'react';

type Props = {
  message: string;
};

const SimpleComponent: React.FC<Props> = ({ message }) => {
  return <div>{message}</div>;
};

export default SimpleComponent;`,

  status: "idle",
};

export const useSnippetStore = createStore(SNIPPET_INITIAL_STATE);
