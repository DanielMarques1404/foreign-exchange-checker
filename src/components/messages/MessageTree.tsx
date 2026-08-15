import { useState } from "react";
import { MessageTreeButton } from "./MessageTreeButton";

export const MessageTree = () => {
  const buttons = ["1D", "1W", "1M", "3M", "1Y", "5Y"];
  const [selectedButton, setSelectedButton] = useState<string>(buttons[0]);

  return (
    <div className="flex items-center justify-center">
      {Array.from(buttons).map((button) => (
        <MessageTreeButton
          key={button}
          label={button}
          isSelected={selectedButton === button}
          onSelect={setSelectedButton}
        />
      ))}
    </div>
  );
};
