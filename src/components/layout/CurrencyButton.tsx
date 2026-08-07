import type { ReactNode } from "react";

import { CurrencyType } from "../../domain/entities";

type CurrencyButtonProps = {
  currency?: CurrencyType;
  isOpen: boolean;
  onClick: () => void;
  children?: ReactNode;
};

export const CurrencyButton = ({
  currency,
  isOpen,
  onClick,
  children,
}: CurrencyButtonProps) => {
  return (
    <div className="relative w-fit">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        disabled={!currency}
        className="flex h-10 w-24 cursor-pointer items-center justify-between gap-2 rounded-md bg-Neutral-900 px-2.5 text-sm font-medium text-Neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
        onClick={onClick}
      >
        {currency ? (
          <span className="flex items-center gap-2">
            <img
              src={currency.flagSrc}
              alt=""
              aria-hidden="true"
              className="h-6 w-6 rounded-full object-cover"
            />
            <span>{currency.code}</span>
          </span>
        ) : (
          <span>...</span>
        )}
        <img
          src="/assets/images/icon-chevron-down.svg"
          alt=""
          aria-hidden="true"
          className="h-4 w-4"
        />
      </button>

      {children}
    </div>
  );
};
