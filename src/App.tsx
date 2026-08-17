import { useState } from "react";
import { ExchangeTrade } from "./components/exchange-box/ExchangeTrade";
import { LiveRatesGroup } from "./components/live-rates/LiveRatesGroup";
import { HistoryTab } from "./components/tabs/History";
import { ViewSwitcher } from "./components/ui/ViewSwitcher";
import { HistoricalPeriod } from "./domain/entities";
import { useCurrencies } from "./hooks/useCurrencies";
import { useHistoricalStats } from "./hooks/useHistoricalStats";
import { useLiveRates } from "./hooks/useLiveRates";

function App() {
  const [selectedTabId, setSelectedTabId] = useState(0);
  const [currencyPair, setCurrencyPair] = useState({
    base: "USD",
    quote: "EUR",
  });
  const [selectedPeriod, setSelectedPeriod] =
    useState<HistoricalPeriod>("1M");
  const { liveRatesList, isLoading, error } = useLiveRates();
  const {
    currenciesList,
    isLoading: isLoadingCurrencies,
    error: currenciesError,
  } = useCurrencies();
  const {
    stats: historicalStats,
    latestRate,
    isLoading: isLoadingHistoricalStats,
    error: historicalStatsError,
  } = useHistoricalStats(currencyPair.base, currencyPair.quote, selectedPeriod);

  return (
    <section className="flex flex-col min-h-dvh w-full bg-Neutral-900 text-Neutral-50">
      <header className="flex flex-col">
        <div className="flex items-center justify-between p-4">
          <img
            className="h-5 md:h-6.5 w-fit"
            src="/assets/images/logo.svg"
            alt="FX Checker"
          />
          <span className="text-[10px] md:text-[14px] text-Neutral-200">
            {`${currenciesList?.length} CURRENCIES · EOD · ECB DATA`}
          </span>
        </div>
        <div className="w-full overflow-hidden">
          {isLoading && (
            <p className="text-sm text-slate-300">Carregando cotacoes...</p>
          )}
          {error && <p className="text-sm text-Red-500">{error}</p>}
          {!isLoading && !error && (
            <LiveRatesGroup liveRatesList={liveRatesList} />
          )}
        </div>
      </header>
      <main className="flex flex-col p-4 gap-10 items-center justify-center w-full">
        <ExchangeTrade
          currenciesList={currenciesList}
          conversionRate={latestRate}
          isLoadingCurrencies={isLoadingCurrencies}
          currenciesError={currenciesError}
          onCurrencyPairChange={(base, quote) => setCurrencyPair({ base, quote })}
        />
        <div className="flex flex-col gap-5 w-full px-4">
          <ViewSwitcher
            selectedItemId={selectedTabId}
            onSelectItemId={setSelectedTabId}
            items={[
              { id: 0, label: "history" },
              { id: 1, label: "compare", counter: 12 },
              { id: 2, label: "favorites" },
              { id: 3, label: "log", counter: 6 },
            ]}
          />
          {selectedTabId === 0 && (
            <HistoryTab
              stats={historicalStats}
              selectedPeriod={selectedPeriod}
              isLoading={isLoadingHistoricalStats}
              error={historicalStatsError}
              onSelectPeriod={setSelectedPeriod}
            />
          )}
          {selectedTabId === 1 && <></>}
          {selectedTabId === 2 && <></>}
          {selectedTabId === 3 && <></>}
        </div>
      </main>
    </section>
  );
}

export default App;
