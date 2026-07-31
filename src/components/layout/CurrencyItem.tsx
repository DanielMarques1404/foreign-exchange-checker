import { getCurrencyFlagSrc } from "../../domain/currencyFlags";

type CurrencyItemProps = {
  currency: string;
  name: string;
  selected: boolean;
  onSelect: () => void;
};

export const CurrencyItem = (props: CurrencyItemProps) => {
  const { currency, name, selected, onSelect } = props;
  const flagSrc = getCurrencyFlagSrc(currency);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={
        "flex h-12 w-full cursor-pointer items-center justify-between gap-2 select-none rounded-md border-2 border-transparent bg-Neutral-900 px-2 py-3 text-left hover:border-Neutral-100"
      }
    >
      <span className="flex items-center gap-2 text-neutral-50">
        {flagSrc && (
          <img
            src={flagSrc}
            alt=""
            aria-hidden="true"
            className="h-6 w-6 rounded-full object-cover"
          />
        )}
        <span className="font-bold">{currency.toUpperCase()}</span>
        <span className="text-Neutral-200">{name}</span>
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
