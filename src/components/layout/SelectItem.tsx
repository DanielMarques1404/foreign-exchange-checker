import type { KeyboardEventHandler, Ref } from "react";

import { SelectItemType } from "../../domain/entities";

type SelectItemProps = {
  selectItem: SelectItemType;
  selected: boolean;
  tabIndex: number;
  optionRef: Ref<HTMLDivElement>;
  onSelect: () => void;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
};

export const SelectItem = ({
  selectItem,
  selected,
  tabIndex,
  optionRef,
  onSelect,
  onKeyDown,
}: SelectItemProps) => {
  const { label, counter } = selectItem;

  return (
    <div
      ref={optionRef}
      role="option"
      aria-selected={selected}
      tabIndex={tabIndex}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className={
        "flex h-12 w-full bg-Neutral-900 cursor-pointer items-center justify-between gap-2 px-2 text-left"
      }
    >
      <span className="text-neutral-50">{label.toUpperCase()}</span>
      {counter && (
        <span className="flex h-6 items-center rounded-full bg-Lime-800 px-2 text-sm text-Lime-500">
          {counter}
        </span>
      )}
    </div>
  );
};
