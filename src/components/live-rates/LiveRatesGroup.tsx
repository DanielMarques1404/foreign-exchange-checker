import { LiveRatesType } from "../../domain/entities";
import { LiveRates } from "./LiveRates";

type LiveRatesGroupProps = {
  liveRatesList: LiveRatesType[];
};

export const LiveRatesGroup = (props: LiveRatesGroupProps) => {
  const marqueeItems = [...props.liveRatesList, ...props.liveRatesList];

  return (
    <div className="flex w-full h-10">
      <ul className="flex shrink-0 items-center justify-center list-disc list-inside px-4 py-3 bg-Lime-500 text-neutral-900 font-semibold">
        <li className="w-34.5">LIVE MARKETS</li>
      </ul>
      <div className="flex-1 overflow-hidden">
        <ul className="flex w-max animate-live-rates-marquee">
          {marqueeItems.map((liveRates, index) => (
          <li key={`${liveRates.currency}-${index}`} className="border-r border-Neutral-300">
            <LiveRates liveRates={liveRates} />
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
