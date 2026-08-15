import { useState } from "react";
import { ExchangeTrade } from "./components/exchange-box/ExchangeTrade";
import { LiveRatesGroup } from "./components/live-rates/LiveRatesGroup";
import { HistoryTab } from "./components/tabs/History";
import { SelectItemGroup } from "./components/ui/SelectItemGroup";
import { TabButtonGroup } from "./components/ui/TabButtonGroup";
import { StatsType } from "./domain/entities";
import { useCurrencies } from "./hooks/useCurrencies";
import { useLiveRates } from "./hooks/useLiveRates";

function App() {
  const { liveRatesList, isLoading, error } = useLiveRates();
  const {
    currenciesList,
    isLoading: isLoadingCurrencies,
    error: currenciesError,
  } = useCurrencies();

  const [selectedTabId, setSelectedTabId] = useState(0);

  const statsDefault: StatsType[] = [
    { label: "open", value: 100, showPercent: false, showSign: false },
    { label: "last", value: 60, showPercent: false, showSign: false },
    { label: "change", value: 40, showPercent: false, showSign: true },
    { label: "% change", value: 0.16, showPercent: true, showSign: true },
  ];

  return (
    <main className="min-h-dvh w-full bg-Neutral-900 p-1 text-Neutral-50">
      <section className="flex flex-col gap-8">
        <img
          className="h-10 w-fit"
          src="/assets/images/logo.svg"
          alt="FX Checker"
        />

        <div className="flex flex-col gap-2 rounded-3xl border border-Neutral-600 bg-Neutral-900 p-2 shadow-2xl shadow-black/30">
          <div className="w-full overflow-hidden">
            {isLoading && (
              <p className="text-sm text-slate-300">Carregando cotacoes...</p>
            )}
            {error && <p className="text-sm text-Red-500">{error}</p>}
            {!isLoading && !error && (
              <LiveRatesGroup liveRatesList={liveRatesList} />
            )}
          </div>

          <div className="mx-auto w-2/5">
            <SelectItemGroup
              selectItems={[
                { id: 0, label: "history" },
                { id: 1, label: "compare", counter: 12 },
                { id: 2, label: "favorites" },
              ]}
            />
          </div>
          <ExchangeTrade
            currenciesList={currenciesList}
            isLoadingCurrencies={isLoadingCurrencies}
            currenciesError={currenciesError}
          />
          <div className="flex flex-col gap-5 px-6">
            <TabButtonGroup
              selectedTabId={selectedTabId}
              onSelectTabId={setSelectedTabId}
              tabButtons={[
                { id: 0, label: "history", counter: 8 },
                { id: 1, label: "compare" },
                { id: 2, label: "favorites", counter: 5 },
                { id: 3, label: "log", counter: 6 },
              ]}
            />
            {selectedTabId === 0 && <HistoryTab stats={statsDefault} />}
            {selectedTabId === 1 && <></>}
            {selectedTabId === 2 && <></>}
            {selectedTabId === 3 && <></>}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
