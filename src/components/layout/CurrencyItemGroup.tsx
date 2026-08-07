import { useState } from "react";

import { CurrencyType } from "../../domain/entities";
import { CurrencyItem } from "./CurrencyItem";

type CurrencyItemGroupProps = {
  currenciesList: CurrencyType[];
  selectedCurrencyCode: string;
  onSelectCurrency: (currencyCode: string) => void;
};

export const CurrencyItemGroup = ({
  currenciesList,
  selectedCurrencyCode,
  onSelectCurrency,
}: CurrencyItemGroupProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredCurrencies = currenciesList.filter((currency) => {
    if (!normalizedSearchTerm) return true;

    return [currency.code, currency.name, currency.symbol]
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearchTerm);
  });
  const favoriteCurrencies = filteredCurrencies
    .filter((currency) => currency.favorite)
    .sort((a, b) => a.code.localeCompare(b.code));
  const otherCurrencies = filteredCurrencies
    .filter((currency) => !currency.favorite)
    .sort((a, b) => a.code.localeCompare(b.code));

  return (
    <div
      role="listbox"
      className="scrollbar-hidden absolute left-0 top-full z-10 mt-2 flex h-114.5 w-77.75 flex-col overflow-y-auto overscroll-contain rounded-md bg-Neutral-900 p-2 shadow-2xl shadow-black/30"
    >
      <label className="flex items-center gap-2 rounded-md border border-Neutral-200 bg-Neutral-800 p-3 text-Neutral-200">
        <img
          src="/assets/images/icon-search.svg"
          alt=""
          aria-hidden="true"
          className="h-6 w-6"
        />
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search currencies ..."
          aria-label="Search currencies"
          className="w-full bg-transparent text-[16px] text-Neutral-200 placeholder:text-Neutral-300 outline-none"
        />
      </label>

      <div className="flex justify-between border-b border-Neutral-500 bg-Neutral-900 p-2 text-[16px] text-Neutral-200">
        <span>POPULAR</span>
        <span>{favoriteCurrencies.length}</span>
      </div>
      {favoriteCurrencies.map((currency) => (
        <CurrencyItem
          key={currency.code}
          currency={currency}
          selected={selectedCurrencyCode === currency.code}
          onSelect={() => onSelectCurrency(currency.code)}
        />
      ))}
      <div className="flex justify-between border-b border-Neutral-500 bg-Neutral-900 p-2 text-[16px] text-Neutral-200">
        <span>OTHER CURRENCIES</span>
        <span>{otherCurrencies.length}</span>
      </div>
      {otherCurrencies.map((currency) => (
        <CurrencyItem
          key={currency.code}
          currency={currency}
          selected={selectedCurrencyCode === currency.code}
          onSelect={() => onSelectCurrency(currency.code)}
        />
      ))}
    </div>
  );
};
