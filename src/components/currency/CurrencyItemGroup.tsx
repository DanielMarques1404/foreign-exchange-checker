import { useState } from "react";

import { CurrencyType } from "../../domain/entities";
import { SearchInput } from "../ui/SearchInput";
import { CurrencyItem } from "./CurrencyItem";

type CurrencyItemGroupProps = {
  currenciesList: CurrencyType[];
  selectedCurrencyCode: string;
  onSelectCurrency: (currency: CurrencyType) => void;
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
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search currencies ..."
        ariaLabel="Search currencies"
      />

      <div className="flex justify-between border-b border-Neutral-500 bg-Neutral-900 p-2 text-[16px] text-Neutral-200">
        <span>POPULAR</span>
        <span>{favoriteCurrencies.length}</span>
      </div>
      {favoriteCurrencies.map((currency) => (
        <CurrencyItem
          key={currency.code}
          currency={currency}
          selected={selectedCurrencyCode === currency.code}
          onSelect={() => onSelectCurrency(currency)}
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
          onSelect={() => onSelectCurrency(currency)}
        />
      ))}
    </div>
  );
};
