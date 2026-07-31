import { getCurrencyFlagSrc } from "../../domain/currencyFlags";
import { CurrencyType } from "../../domain/entities";
import { cn } from "../../utils/cn";

type CurrencyItemProps = {
  currency: CurrencyType;
  selected: boolean;
  onSelect: () => void;
};

export const CurrencyItem = (props: CurrencyItemProps) => {
  const { currency, selected, onSelect } = props;
  const flagSrc = getCurrencyFlagSrc(currency.code);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn("flex h-12 w-full cursor-pointer items-center justify-between gap-2 select-none rounded-md border-2 border-transparent bg-Neutral-900 px-2 py-3 text-left hover:border-Neutral-100", currency.favorite && "border-Lime-500", selected && "border-Lime-500")}
    >
      <span className="flex items-center gap-2 text-neutral-50">
        {flagSrc ? (
          <img
            src={flagSrc}
            alt=""
            aria-hidden="true"
            className="h-6 w-6 rounded-full object-cover"
          />
        ) : (<div className="h-6 w-6 rounded-full bg-Neutral-700"></div>)}
        <span className="font-bold">{currency.code}</span>
        <span className="text-Neutral-200">{currency.name}</span>
      </span>
      {selected && (
        <img
          src="/assets/images/icon-check.svg"
          alt=""
          aria-hidden="true"
          className="h-4 w-4"
        />
      )}
    </button>
  );
};
