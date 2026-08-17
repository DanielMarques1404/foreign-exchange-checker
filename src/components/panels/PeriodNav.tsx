import { HistoricalPeriod } from "../../domain/entities";
import { PeriodButton } from "./PeriodButton";

const periods: HistoricalPeriod[] = ["1D", "1W", "1M", "3M", "1Y", "5Y"];

type PeriodNavProps = {
  selectedPeriod: HistoricalPeriod;
  onSelectPeriod: (period: HistoricalPeriod) => void;
};

export const PeriodNav = ({
  selectedPeriod,
  onSelectPeriod,
}: PeriodNavProps) => {
  return (
    <nav className="flex items-center justify-center">
      {periods.map((button) => (
        <PeriodButton
          key={button}
          label={button}
          isSelected={selectedPeriod === button}
          onSelect={onSelectPeriod}
        />
      ))}
    </nav>
  );
};
