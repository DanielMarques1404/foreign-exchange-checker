import { StatsType } from "../../domain/entities";
import { PeriodNav } from "../panels/PeriodNav";
import { StatBox } from "../panels/StatBox";

type HistoryTabProps = {
  stats: StatsType[];
  isLoading?: boolean;
  error?: string | null;
};

export const HistoryTab = ({
  stats,
  isLoading = false,
  error = null,
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
      <PeriodNav />
      <div className="w-full h-94.25 bg-Neutral-600 border border-Neutral-500 rounded-md"></div>
    </section>
  );
};
