import React from "react";
import tooltipStyles from "./styles.module.css";

interface TooltipProps {
  tooltipText: string;
  direction: 1 | 0;
}

export const WithTooltip: React.FC<React.PropsWithChildren<TooltipProps>> = ({
  children,
  ...tooltipProps
}) => {
  const [isMouseEnter, setIsMouseEnter] = React.useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setIsMouseEnter(true)}
      onMouseLeave={() => setIsMouseEnter(false)}
    >
      {isMouseEnter && <DefaultTooltip {...tooltipProps} />}
      {children}
    </div>
  );
};

const DefaultTooltip: React.FC<TooltipProps> = ({ direction, tooltipText }) => {
  const className = `${tooltipStyles.tooltip} ${
    direction === 1 ? tooltipStyles.top : tooltipStyles.bottom
  }`;

  return <div className={className}>{tooltipText}</div>;
};
