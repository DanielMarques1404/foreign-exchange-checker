import { useEffect, useRef, useState } from "react";

import { CurrencyType } from "../../domain/entities";
import { CurrencyItemGroup } from "./CurrencyItemGroup";

type CurrencyButtonProps = {
  currenciesList: CurrencyType[];
  initialCurrencyCode?: string;
  selectedCurrencyCode?: string;
  isLoading?: boolean;
  error?: string | null;
  onCurrencyChange?: (currency: CurrencyType) => void;
};

export const CurrencyButton = ({
  currenciesList,
  initialCurrencyCode = "USD",
  selectedCurrencyCode,
  isLoading = false,
  error = null,
  onCurrencyChange,
}: CurrencyButtonProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelectedCurrencyCode, setInternalSelectedCurrencyCode] =
    useState(initialCurrencyCode);
  const currentSelectedCurrencyCode =
    selectedCurrencyCode ?? internalSelectedCurrencyCode;
  const selectedCurrency =
    currenciesList.find(
      (currency) => currency.code === currentSelectedCurrencyCode,
    ) ??
    currenciesList[0];

  const selectCurrency = (currency: CurrencyType) => {
    if (selectedCurrencyCode === undefined) {
      setInternalSelectedCurrencyCode(currency.code);
    }

    setIsOpen(false);
    onCurrencyChange?.(currency);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative w-fit">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        disabled={!selectedCurrency}
        className="flex h-10 w-24 cursor-pointer items-center justify-between gap-2 rounded-md bg-Neutral-900 px-2.5 text-sm font-medium text-Neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
        onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
      >
        {selectedCurrency ? (
          <span className="flex items-center gap-2">
            <img
              src={selectedCurrency.flagSrc}
              alt=""
              aria-hidden="true"
              className="h-6 w-6 rounded-full object-cover"
            />
            <span>{selectedCurrency.code}</span>
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

      {isOpen && (
        <>
          {isLoading && (
            <p className="absolute left-0 top-full z-10 mt-2 text-sm text-slate-300">
              Loading currencies...
            </p>
          )}
          {error && (
            <p className="absolute left-0 top-full z-10 mt-2 text-sm text-Red-500">
              {error}
            </p>
          )}
          {!isLoading && !error && (
            <CurrencyItemGroup
              currenciesList={currenciesList}
              selectedCurrencyCode={
                selectedCurrency?.code ?? currentSelectedCurrencyCode
              }
              onSelectCurrency={selectCurrency}
            />
          )}
        </>
      )}
    </div>
  );
};
