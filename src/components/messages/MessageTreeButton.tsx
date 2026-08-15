type MessageTreeButtonProps = {
  label: string;
  isSelected?: boolean;
  onSelect?: (label: string) => void;
};

export const MessageTreeButton = ({
  label,
  isSelected,
  onSelect,
}: MessageTreeButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center p-3 w-11.75 h-9.5 bg-Neutral-500 cursor-pointer ${isSelected ? "text-Neutral-50" : "text-Neutral-200"}`}
      onClick={() => onSelect && onSelect(label)}
    >
      {label}
    </button>
  );
};
