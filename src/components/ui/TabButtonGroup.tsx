import { useEffect, useState } from "react";

import { TabButtonType } from "../../domain/entities";
import { TabButton } from "./TabButton";

type TabButtonGroupProps = {
  tabButtons: TabButtonType[];
  selectedTabId: number;
  onSelectTabId: (id: number) => void;
};

export const TabButtonGroup = (props: TabButtonGroupProps) => {
  const [selectedTabId, setSelectedTabId] = useState(props.selectedTabId);

  useEffect(() => {
    setSelectedTabId(props.selectedTabId);
  }, [props.selectedTabId]);

  return (
    <nav role="tablist" className="flex bg-Neutral-900">
      {props.tabButtons.map((tabButton) => (
        <TabButton
          key={tabButton.id}
          tabButton={tabButton}
          selected={selectedTabId === tabButton.id}
          onSelect={() => {
            setSelectedTabId(tabButton.id);
            props.onSelectTabId(tabButton.id);
          }}
        />
      ))}
    </nav>
  );
};
