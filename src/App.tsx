import { useState } from "react";
import { CurrencyButton } from "./components/layout/CurrencyButton";
import { CurrencyItemGroup } from "./components/layout/CurrencyItemGroup";
import { LiveRatesGroup } from "./components/layout/LiveRatesGroup";
import { SelectItemGroup } from "./components/layout/SelectItemGroup";
import { TabButtonGroup } from "./components/layout/TabButtonGroup";
import { useCurrencies } from "./hooks/useCurrencies";
import { useLiveRates } from "./hooks/useLiveRates";

function App() {
  const [showCurrencyList, setShowCurrencyList] = useState(false);
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("USD");
  const { liveRatesList, isLoading, error } = useLiveRates();
  const {
    currenciesList,
    isLoading: isLoadingCurrencies,
    error: currenciesError,
  } = useCurrencies();
  const selectedCurrency =
    currenciesList.find((currency) => currency.code === selectedCurrencyCode) ??
    currenciesList[0];

  const selectCurrency = (currencyCode: string) => {
    setSelectedCurrencyCode(currencyCode);
    setShowCurrencyList(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <section className="mx-auto flex max-w-5xl flex-col gap-8">
        <img
          className="h-10 w-fit"
          src="/assets/images/logo.svg"
          alt="FX Checker"
        />

        <div className="flex flex-col gap-2 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-black/30">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            FX Checker
          </h1>
          <div className="w-full overflow-hidden">
            {isLoading && (
              <p className="text-sm text-slate-300">Carregando cotacoes...</p>
            )}
            {error && <p className="text-sm text-Red-500">{error}</p>}
            {!isLoading && !error && (
              <LiveRatesGroup liveRatesList={liveRatesList} />
            )}
          </div>
          <TabButtonGroup
            tabButtons={[
              { id: 0, label: "history", counter: 8 },
              { id: 1, label: "compare" },
              { id: 2, label: "favorites", counter: 5 },
              { id: 3, label: "log", counter: 6 },
            ]}
          />
          <div className="mx-auto w-2/5">
            <SelectItemGroup
              selectItems={[
                { id: 0, label: "history" },
                { id: 1, label: "compare", counter: 12 },
                { id: 2, label: "favorites" },
              ]}
            />
          </div>
          <CurrencyButton
            currency={selectedCurrency}
            isOpen={showCurrencyList}
            onClick={() => setShowCurrencyList(!showCurrencyList)}
          >
            {showCurrencyList && (
              <>
                {isLoadingCurrencies && (
                  <p className="absolute left-0 top-full z-10 mt-2 text-sm text-slate-300">
                    Loading currencies...
                  </p>
                )}
                {currenciesError && (
                  <p className="absolute left-0 top-full z-10 mt-2 text-sm text-Red-500">
                    {currenciesError}
                  </p>
                )}
                {!isLoadingCurrencies && !currenciesError && (
                  <CurrencyItemGroup
                    currenciesList={currenciesList}
                    selectedCurrencyCode={
                      selectedCurrency?.code ?? selectedCurrencyCode
                    }
                    onSelectCurrency={selectCurrency}
                  />
                )}
              </>
            )}
          </CurrencyButton>
        </div>
      </section>
    </main>
  );
}

export default App;
