import {
  HistoricalPeriod,
  HistoricalPoint,
  StatsType,
} from "../../domain/entities";
import { HistoryChart } from "../panels/HistoryChart";
import { PeriodNav } from "../panels/PeriodNav";
import { StatBox } from "../panels/StatBox";

type HistoryTabProps = {
  stats: StatsType[];
  points: HistoricalPoint[];
  base: string;
  quote: string;
  selectedPeriod: HistoricalPeriod;
  isLoading?: boolean;
  error?: string | null;
  onSelectPeriod: (period: HistoricalPeriod) => void;
};

export const HistoryTab = ({
  stats,
  points,
  base,
  quote,
  selectedPeriod,
  isLoading = false,
  error = null,
  onSelectPeriod,
}: HistoryTabProps) => {
  return (
    <section className="flex flex-col gap-4 justify-center items-start">
      {isLoading && (
        <p className="text-sm text-Neutral-200">Carregando historico...</p>
      )}
      {error && <p className="text-sm text-Red-500">{error}</p>}
      <div className="grid grid-cols-2 grid-rows-2 md:flex gap-2.5 w-full">
        {stats.map((stat, index) => (
          <StatBox
            key={index}
            label={stat.label}
            value={stat.value}
            showPercent={stat.showPercent}
            showSign={stat.showSign}
            showTrendIcon={stat.showTrendIcon}
          />
        ))}
      </div>
      <PeriodNav
        selectedPeriod={selectedPeriod}
        onSelectPeriod={onSelectPeriod}
      />
      <HistoryChart points={points} base={base} quote={quote} />
    </section>
  );
};
