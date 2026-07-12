import { LiveRatesType } from "../../domain/entities";
import { LiveRates } from "./LiveRates";

type LiveRatesGroupProps = {
    liveRatesList: LiveRatesType[];
}

export const LiveRatesGroup = (props: LiveRatesGroupProps) => {
    return (
        <ul className="flex">
            {props.liveRatesList.map((liveRates, index) => <li key={index} className="border-r border-Neutral-300"><LiveRates liveRates={liveRates} /></li>)}
        </ul>
    )
}