import { TabButtonType } from "../../domain/entities";
import { cn } from "../../utils/cn";

type TabButtonProps = {
  tabButton: TabButtonType;
  selected: boolean;
  onSelect: () => void;
};

export const TabButton = ({ tabButton, selected, onSelect }: TabButtonProps) => {
  const { label, counter } = tabButton;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onSelect}
      className={cn(
        "flex cursor-pointer items-center justify-center gap-2 border-b-2 px-4 py-2",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-Lime-500",
        selected ? "border-Lime-500" : "border-transparent",
      )}
    >
      <span className="text-neutral-50">{label.toUpperCase()}</span>
      {counter && (
        <span className="bg-Lime-800 text-Lime-500 px-2 py-1 rounded-full text-sm">
          {counter}
        </span>
      )}
    </button>
  );
};
