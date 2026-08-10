import { useState } from "react";

import { TabButtonType } from "../../domain/entities";
import { TabButton } from "./TabButton";

type TabButtonGroupProps = {
  tabButtons: TabButtonType[];
};

export const TabButtonGroup = (props: TabButtonGroupProps) => {
  const [selectedTabId, setSelectedTabId] = useState(0);

  return (
    <div role="tablist" className="flex bg-Neutral-900">
      {props.tabButtons.map((tabButton) => (
        <TabButton
          key={tabButton.id}
          tabButton={tabButton}
          selected={selectedTabId === tabButton.id}
          onSelect={() => setSelectedTabId(tabButton.id)}
        />
      ))}
    </div>
  );
};
