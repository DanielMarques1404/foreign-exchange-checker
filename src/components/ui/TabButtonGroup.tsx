import { TabButtonType } from "../../domain/entities";
import { cn } from "../../utils/cn";
import { TabButton } from "./TabButton";

type TabButtonGroupProps = {
  tabButtons: TabButtonType[];
  selectedTabId: number;
  onSelectTabId: (id: number) => void;
  className?: string;
};

export const TabButtonGroup = (props: TabButtonGroupProps) => {
  return (
    <nav role="tablist" className={cn("flex bg-Neutral-900", props.className)}>
      {props.tabButtons.map((tabButton) => (
        <TabButton
          key={tabButton.id}
          tabButton={tabButton}
          selected={props.selectedTabId === tabButton.id}
          onSelect={() => {
            props.onSelectTabId(tabButton.id);
          }}
        />
      ))}
    </nav>
  );
};
