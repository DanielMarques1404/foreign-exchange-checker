import { useState } from "react";

import { CurrencyType } from "../../domain/entities";
import { ExchangeBox } from "./ExchangeBox";
import { FavoritedButton } from "../ui/FavoritedButton";
import { LogButton } from "../ui/LogButton";

type ExchangeTradeProps = {
  currenciesList: CurrencyType[];
  conversionRate?: number;
  isLoadingCurrencies?: boolean;
  currenciesError?: string | null;
};

const initialSendCurrencyCode = "USD";
const initialReceiveCurrencyCode = "EUR";

export const ExchangeTrade = ({
  currenciesList,
  conversionRate = 1.2,
  isLoadingCurrencies = false,
  currenciesError = null,
}: ExchangeTradeProps) => {
  const [sendValue, setSendValue] = useState<number | null>(null);
  const [sendCurrencyCode, setSendCurrencyCode] = useState(
    initialSendCurrencyCode,
  );
  const [receiveCurrencyCode, setReceiveCurrencyCode] = useState(
    initialReceiveCurrencyCode,
  );
  const isInitialPair =
    sendCurrencyCode === initialSendCurrencyCode &&
    receiveCurrencyCode === initialReceiveCurrencyCode;
  const isReversedInitialPair =
    sendCurrencyCode === initialReceiveCurrencyCode &&
    receiveCurrencyCode === initialSendCurrencyCode;
  const effectiveConversionRate = isInitialPair
    ? conversionRate
    : isReversedInitialPair
      ? 1 / conversionRate
      : conversionRate;
  const receiveValue =
    sendValue === null
      ? null
      : Number((sendValue * effectiveConversionRate).toFixed(2));

  const swapCurrencies = () => {
    setSendCurrencyCode(receiveCurrencyCode);
    setReceiveCurrencyCode(sendCurrencyCode);
  };

  return (
    <div className="flex flex-col gap-4 bg-Neutral-900 p-5">
      <span>CHECK THE RATE</span>
      <div className="flex flex-col bg-Neutral-700 rounded-3xl items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row w-full items-center justify-between gap-4 p-5">
          <ExchangeBox
            kind="SEND"
            currenciesList={currenciesList}
            selectedCurrencyCode={sendCurrencyCode}
            isLoadingCurrencies={isLoadingCurrencies}
            currenciesError={currenciesError}
            onChangeValue={setSendValue}
            onCurrencyChange={(currency) => setSendCurrencyCode(currency.code)}
          />
          <button
            type="button"
            aria-label="Swap currencies"
            onClick={swapCurrencies}
            className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center bg-Neutral-600 border border-Neutral-300 rounded-xl"
          >
            <img
              src="/assets/images/icon-exchange-vertical.svg"
              alt=""
              aria-hidden="true"
              className="h-5 w-5 md:hidden"
            />
            <img
              src="/assets/images/icon-exchange.svg"
              alt=""
              aria-hidden="true"
              className="hidden h-5 w-5 md:block"
            />
          </button>
          <ExchangeBox
            kind="RECEIVE"
            currenciesList={currenciesList}
            value={receiveValue}
            readOnly
            selectedCurrencyCode={receiveCurrencyCode}
            isLoadingCurrencies={isLoadingCurrencies}
            currenciesError={currenciesError}
            onCurrencyChange={(currency) =>
              setReceiveCurrencyCode(currency.code)
            }
          />
        </div>
        <div className="flex w-full text-sm text-Neutral-50 items-center justify-between border-dashed border-t border-Neutral-500 px-5 py-4">
          <span>1 {sendCurrencyCode} = {effectiveConversionRate.toFixed(4)}{" "}{receiveCurrencyCode}</span>
          <FavoritedButton />
          <LogButton />
        </div>
      </div>
    </div>
  );
};
