import { useState } from "react";

import { CurrencyType } from "../../domain/entities";
import { CurrencyItem } from "./CurrencyItem";

type CurrencyItemGroupProps = {
  currenciesList: CurrencyType[];
};

export const CurrencyItemGroup = ({ currenciesList }: CurrencyItemGroupProps) => {
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("USD");

  return (
    <div className="flex w-full flex-col gap-1">
      {currenciesList.map((currency) => (
        <CurrencyItem
          key={currency.code}
          currency={currency}
          selected={selectedCurrencyCode === currency.code}
          onSelect={() => setSelectedCurrencyCode(currency.code)}
        />
      ))}
    </div>
  );
};
