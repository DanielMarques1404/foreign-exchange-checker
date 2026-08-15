import type { KeyboardEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";

import { SelectItemType } from "../../domain/entities";
import { cn } from "../../utils/cn";
import { SelectItem } from "./SelectItem";

type SelectItemGroupProps = {
  selectItems: SelectItemType[];
  selectedItemId: number;
  onSelectItemId: (id: number) => void;
  className?: string;
};

export const SelectItemGroup = ({
  selectItems,
  selectedItemId,
  onSelectItemId,
  className,
}: SelectItemGroupProps) => {
  const listboxId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const optionRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const selectedItem =
    selectItems.find((selectItem) => selectItem.id === selectedItemId) ??
    selectItems[0];

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const focusOption = (id: number) => {
    requestAnimationFrame(() => optionRefs.current[id]?.focus());
  };

  const openListbox = () => {
    if (!selectedItem) {
      return;
    }

    setIsOpen(true);
    focusOption(selectedItem.id);
  };

  const selectOption = (id: number) => {
    onSelectItemId(id);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (selectItems.length === 0) {
      return;
    }

    const lastIndex = selectItems.length - 1;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusOption(selectItems[Math.min(index + 1, lastIndex)].id);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      focusOption(selectItems[Math.max(index - 1, 0)].id);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusOption(selectItems[0].id);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      focusOption(selectItems[lastIndex].id);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectOption(selectItems[index].id);
    }
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openListbox();
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((currentIsOpen) => !currentIsOpen);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
    }
  };

  if (!selectedItem) {
    return null;
  }

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
        onKeyDown={handleTriggerKeyDown}
        className="flex h-12 w-full cursor-pointer items-center justify-between gap-2 bg-Neutral-700 px-2 text-left border border-Neutral-400 rounded-md"
      >
        <span className="text-neutral-50">{selectedItem.label.toUpperCase()}</span>
        <span className="flex items-center gap-2">
          {selectedItem.counter && (
            <span className="flex h-6 items-center rounded-full bg-Lime-800 px-2 text-sm text-Lime-500">
              {selectedItem.counter}
            </span>
          )}
          <img
            src="/assets/images/icon-chevron-down.svg"
            alt=""
            aria-hidden="true"
            className="h-4 w-4"
          />
        </span>
      </button>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 top-full z-10 mt-2 flex w-full flex-col overflow-hidden"
        >
          {selectItems.map((selectItem, index) => (
            <SelectItem
              key={selectItem.id}
              optionRef={(element) => {
                optionRefs.current[selectItem.id] = element;
              }}
              selectItem={selectItem}
              selected={selectedItemId === selectItem.id}
              tabIndex={-1}
              onSelect={() => selectOption(selectItem.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
