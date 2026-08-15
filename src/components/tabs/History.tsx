import { StatsType } from "../../domain/entities";
import { PeriodNav } from "../panels/PeriodNav";
import { StatBox } from "../panels/StatBox";

type HistoryTabProps = {
  stats: StatsType[];
};

export const HistoryTab = ({ stats }: HistoryTabProps) => {
  return (
    <section className="flex flex-col gap-4 items-start">
      <div className="flex gap-4">
        {stats.map((stat, index) => (
          <StatBox
            key={index}
            label={stat.label}
            value={stat.value}
            showPercent={stat.showPercent}
            showSign={stat.showSign}
          />
        ))}
      </div>
      <PeriodNav />
      <div className="w-full h-94.25 bg-Neutral-600 border border-Neutral-500 rounded-md"></div>
    </section>
  );
};
