import React from "react";
import tooltipStyles from "./styles.module.css";

interface TooltipProps {
  tooltipText: string;
  direction: "top" | "bottom";
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
      className={tooltipStyles.relative}
      aria-label={isMouseEnter ? tooltipProps.tooltipText : undefined}
    >
      {isMouseEnter && <DefaultTooltip {...tooltipProps} />}
      {children}
    </div>
  );
};

const DefaultTooltip: React.FC<TooltipProps> = ({ direction, tooltipText }) => {
  const className = `${tooltipStyles.tooltip} ${
    direction === "top" ? tooltipStyles.top : tooltipStyles.bottom
  }`;

  return <div className={className}>{tooltipText}</div>;
};
