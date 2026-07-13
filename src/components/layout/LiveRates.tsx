import { LiveRatesType } from "../../domain/entities";
import { cn } from "../../utils/cn";

type LiveRatesProps = {
    liveRates: LiveRatesType;
}

export const LiveRates = (props: LiveRatesProps) => {
    const change = props.liveRates.change;

    return (
        <div className="flex gap-2.5 items-center justify-around w-52 h-10 bg-Neutral-500 px-4 py-3 opacity-100 text-[13px]">
            <span className="text-Neutral-200">{props.liveRates.currency}</span>
            <span className="font-bold text-Neutral-50">{props.liveRates.value.toFixed(4)}</span>
            <span className={cn("font-bold", typeof change === "number" ? change < 0 ? "text-Red-500" : "text-Green-500" : "text-Neutral-200")}>
                {typeof change === "number" ? `${change < 0 ? '▼' : '▲'} ${Math.abs(change).toFixed(2)}%` : "LIVE"}
            </span>
        </div>
    );
}
