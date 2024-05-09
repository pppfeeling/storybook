import classNames from "classnames";
import React, { ReactElement, ReactNode } from "react";

type SplitScreenProp = {
  children: ReactNode;
  leftWidth?: number;
  rightWidth?: number;
};

export function SplitScreen({
  children,
  leftWidth = 1,
  rightWidth = 1,
}: SplitScreenProp) {
  const [left, right] = React.Children.toArray(children);

  return (
    <div className="flex flex-column">
      <div className="flex-1">{left}</div>
      <div className="flex-1">{right}</div>
    </div>
  );
}
