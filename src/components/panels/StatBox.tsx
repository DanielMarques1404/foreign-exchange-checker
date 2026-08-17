import { cn } from "../../utils/cn";

type StatBoxProps = {
  label: string;
  value?: number;
  className?: string;
  showPercent?: boolean;
  showSign?: boolean;
  showTrendIcon?: boolean;
};

export const StatBox = (props: StatBoxProps) => {
  const hasTrend = props.showSign || props.showPercent;
  const isNegative = props.value !== undefined && props.value < 0;
  const isPositive = props.value !== undefined && props.value > 0;

  return (
    <div
      className={cn(
        "flex flex-col gap-4 bg-Neutral-700 border border-Neutral-600 rounded-md px-5 py-3 w-full h-20.25 md:w-35",
        props.className,
      )}
    >
      <span className="text-Neutral-300">{props.label.toUpperCase()}</span>
      <span
        className={cn(
          "text-Neutral-50 text-[20px]",
          hasTrend && isPositive && "text-Green-500",
          hasTrend && isNegative && "text-Red-500",
        )}
      >
        {props.showTrendIcon && props.value !== undefined && props.value > 0
          ? "▲ "
          : props.showTrendIcon && props.value !== undefined && props.value < 0
            ? "▼ "
            : ""}
        {props.showSign && props.value !== undefined && props.value > 0
          ? "+"
          : ""}
        {props.value === undefined
          ? "--"
          : !props.showPercent
            ? props.value.toFixed(4)
            : props.value.toFixed(2)}
        {props.showPercent && props.value !== undefined && (
          <span className="text-sm">%</span>
        )}
      </span>
    </div>
  );
};
