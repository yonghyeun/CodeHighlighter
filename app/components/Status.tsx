import type { Status } from "./Button";

const StatusIcon = ({ status }: { status: Status }) => {
  switch (status) {
    case "idle":
      return <p className="hidden"></p>;
    case "succeed":
      return <p className="text-sm mr-2">🙆</p>;
    case "fail":
      return <p className="text-sm mr-2">🙅‍♂️</p>;
  }
};

export default StatusIcon;
