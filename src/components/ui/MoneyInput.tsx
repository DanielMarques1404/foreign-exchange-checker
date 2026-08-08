import { useState } from "react";

import { cn } from "../../utils/cn";

type MoneyInputProps = {
  value?: number | null;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
  onValueChange?: (value: number | null) => void;
};

export const MoneyInput = ({
  value,
  placeholder = "Enter amount",
  className,
  readOnly = false,
  onValueChange,
}: MoneyInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const isControlled = value !== undefined;
  const displayValue = isControlled
    ? value === null
      ? ""
      : value.toFixed(2)
    : inputValue;

  const handleChange = (nextValue: string) => {
    if (!/^\d*([.,]\d{0,2})?$/.test(nextValue)) {
      return;
    }

    if (!isControlled) {
      setInputValue(nextValue);
    }

    const normalizedValue = nextValue.replace(",", ".");
    const parsedValue = Number(normalizedValue);

    onValueChange?.(
      nextValue === "" || Number.isNaN(parsedValue) ? null : parsedValue,
    );
  };

  return (
    <input
      type="text"
      inputMode="decimal"
      value={displayValue}
      readOnly={readOnly}
      onChange={(event) => handleChange(event.target.value)}
      placeholder={placeholder}
      className={cn(
        "bg-Neutral-800 text-2xl text-Neutral-50 placeholder:text-Neutral-500 outline-none",
        className,
      )}
    />
  );
};
