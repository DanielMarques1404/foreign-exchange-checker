import { CurrencyType } from "../../domain/entities";
import { CurrencyButton } from "../currency/CurrencyButton";
import { MoneyInput } from "../ui/MoneyInput";

type ExchangeBoxProps = {
  kind: "SEND" | "RECEIVE";
  currenciesList: CurrencyType[];
  value?: number | null;
  readOnly?: boolean;
  selectedCurrencyCode: string;
  isLoadingCurrencies?: boolean;
  currenciesError?: string | null;
  onChangeValue?: (value: number | null) => void;
  onCurrencyChange: (currency: CurrencyType) => void;
};

export const ExchangeBox = ({
  kind,
  currenciesList,
  value,
  readOnly = false,
  selectedCurrencyCode,
  isLoadingCurrencies = false,
  currenciesError = null,
  onChangeValue,
  onCurrencyChange,
}: ExchangeBoxProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-Neutral-600 p-5 border border-Neutral-300 w-full">
      <label className="block text-[14px] leading-[120%] text-Neutral-100">
        {kind === "SEND" ? "SEND" : "RECEIVE"}
      </label>
      <div className="flex items-center justify-between">
        <MoneyInput
          value={value}
          readOnly={readOnly}
          onValueChange={onChangeValue}
        />
        <CurrencyButton
          currenciesList={currenciesList}
          selectedCurrencyCode={selectedCurrencyCode}
          isLoading={isLoadingCurrencies}
          error={currenciesError}
          onCurrencyChange={onCurrencyChange}
        />
      </div>
    </div>
  );
};
