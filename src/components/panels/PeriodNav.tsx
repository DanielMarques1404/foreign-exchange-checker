import { useState } from "react";
import { PeriodButton } from "./PeriodButton";

export const PeriodNav = () => {
  const buttons = ["1D", "1W", "1M", "3M", "1Y", "5Y"];
  const [selectedButton, setSelectedButton] = useState<string>(buttons[0]);

  return (
    <nav className="flex items-center justify-center">
      {Array.from(buttons).map((button) => (
        <PeriodButton
          key={button}
          label={button}
          isSelected={selectedButton === button}
          onSelect={setSelectedButton}
        />
      ))}
    </nav>
  );
};
