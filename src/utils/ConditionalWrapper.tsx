import React, { ReactElement } from "react";

interface IWrapperProps {
  condition: boolean;
  wrapper: (children: React.ReactNode) => ReactElement;
}

const ConditionalWrapper: React.FC<IWrapperProps> = ({
  condition,
  wrapper,
  children,
}) => (condition ? wrapper(children) : <>{children}</>);

export default ConditionalWrapper;
