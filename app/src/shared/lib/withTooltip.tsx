import React, { ComponentType, PropsWithChildren } from "react";
import tooltipStyles from "./styles.module.css";

interface TooltipProps {
  direction: 1 | 0;
}

const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = ({
  children,
  direction,
}) => {
  const className = `${tooltipStyles.tooltip} ${
    direction === 1 ? tooltipStyles.top : tooltipStyles.bottom
  }`;

  return <div className={className}>{children}</div>;
};

export const withTooltip =
  <P extends object>(Component: ComponentType<P>) =>
  (tooltipText: string, direction: 1 | 0) => {
    const WrappedComponent: React.FC<P> = (props: P) => {
      // memoization 은 선택적으로 사용 하도 된다.
      const MemoizedComponent = React.useMemo(
        () => <Component {...props} />,
        [props]
      );

      const [isMouseEnter, setIsMouseEnter] = React.useState<boolean>(false);

      const handleMouseEnter = () => setIsMouseEnter(true);
      const handleMouseLeave = () => setIsMouseEnter(false);

      return (
        <div
          className={tooltipStyles.relative}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isMouseEnter && (
            <Tooltip direction={direction}>{tooltipText}</Tooltip>
          )}
          {MemoizedComponent}
        </div>
      );
    };

    WrappedComponent.displayName = `WithTooltip(${
      Component.displayName || Component.name || "Component"
    })`;

    return WrappedComponent;
  };

export default withTooltip;
