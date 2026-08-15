type PeriodButtonProps = {
  label: string;
  isSelected?: boolean;
  onSelect?: (label: string) => void;
};

export const PeriodButton = ({
  label,
  isSelected,
  onSelect,
}: PeriodButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center p-3 w-11.75 h-9.5 rounded-sm cursor-pointer ${isSelected ? "text-Neutral-50 bg-Neutral-500" : "text-Neutral-200 bg-Neutral-700"}`}
      onClick={() => onSelect && onSelect(label)}
    >
      {label}
    </button>
  );
};
