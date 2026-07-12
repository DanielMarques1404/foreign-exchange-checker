import { LiveRatesType } from "../../domain/entities";
import { cn } from "../../utils/cn";

type LiveRatesProps = {
    liveRates: LiveRatesType;
}

export const LiveRates = (props: LiveRatesProps) => {
    return (
        <div className="flex gap-2.5 items-center justify-around w-52 h-10 bg-Neutral-500 px-4 py-3 opacity-100 text-[13px]">
            <span className="text-Neutral-200">{props.liveRates.currency}</span>
            <span className="font-bold text-Neutral-50">{props.liveRates.value.toFixed(4)}</span>
            <span className={cn("font-bold", props.liveRates.rate < 0 ? "text-Red-500" : "text-Green-500")}>
                {`${props.liveRates.rate < 0 ? '▼' : '▲'} ${Math.abs(props.liveRates.rate).toFixed(2)}%`}
            </span>
        </div>
    );
}