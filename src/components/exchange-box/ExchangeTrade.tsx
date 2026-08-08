import { useState } from "react";

import { CurrencyType } from "../../domain/entities";
import { ExchangeBox } from "./ExchangeBox";

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
    <div className="flex items-center justify-center gap-2 bg-Neutral-700 p-2">
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
        className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center bg-Neutral-600"
      >
        <img
          src="/assets/images/icon-exchange.svg"
          alt=""
          aria-hidden="true"
          className="h-5 w-5"
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
        onCurrencyChange={(currency) => setReceiveCurrencyCode(currency.code)}
      />
    </div>
  );
};
