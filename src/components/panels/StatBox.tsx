import { cn } from "../../utils/cn";

type StatBoxProps = {
  label: string;
  value?: number;
  className?: string;
  showPercent?: boolean;
  showSign?: boolean;
};

export const StatBox = (props: StatBoxProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 bg-Neutral-700 border border-Neutral-600 rounded-md px-5 py-3 w-35 h-20.25",
        props.className,
      )}
    >
      <span className="text-Neutral-300">{props.label.toUpperCase()}</span>
      <span
        className={cn(
          "text-Neutral-50 text-[20px]",
          (props.showSign || props.showPercent) && "text-Green-500",
        )}
      >
        {props.showPercent && props.value !== undefined && props.value > 0
          ? "▲ "
          : props.value !== undefined && props.value < 0
            ? "▼ "
            : ""}
        {props.showSign && props.value !== undefined && props.value > 0
          ? "+"
          : ""}
        {!props.showPercent ? props.value?.toFixed(4) : props.value?.toFixed(2)}
        {props.showPercent && props.value !== undefined && (
          <span className="text-sm">%</span>
        )}
      </span>
    </div>
  );
};
