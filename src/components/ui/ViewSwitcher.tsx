import { TabButtonType } from "../../domain/entities";
import { SelectItemGroup } from "./SelectItemGroup";
import { TabButtonGroup } from "./TabButtonGroup";

type ViewSwitcherProps = {
  items: TabButtonType[];
  selectedItemId: number;
  onSelectItemId: (id: number) => void;
};

export const ViewSwitcher = ({
  items,
  selectedItemId,
  onSelectItemId,
}: ViewSwitcherProps) => {
  return (
    <>
      <SelectItemGroup
        className="md:hidden"
        selectItems={items}
        selectedItemId={selectedItemId}
        onSelectItemId={onSelectItemId}
      />
      <TabButtonGroup
        className="hidden md:flex"
        tabButtons={items}
        selectedTabId={selectedItemId}
        onSelectTabId={onSelectItemId}
      />
    </>
  );
};
