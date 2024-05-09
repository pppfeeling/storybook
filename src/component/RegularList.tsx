import { ComponentType, ReactElement } from "react";

type RegularListProp = {
  items: unknown[];
  sourceName: string;
  ItemComponent: ComponentType<any>;
};

export function RegularList({
  items,
  sourceName,
  ItemComponent,
}: RegularListProp) {
  return items.map((item: unknown, i: number) => (
    <ItemComponent key={i} {...{ [sourceName]: item }} />
  ));
}
