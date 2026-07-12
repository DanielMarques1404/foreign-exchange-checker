import { LiveRatesGroup } from "./components/layout/LiveRatesGroup";

function App() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <section className="mx-auto flex max-w-5xl flex-col gap-8">
        <img
          className="h-10 w-fit"
          src="/assets/images/logo.svg"
          alt="FX Checker"
        />

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-black/30">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Frontend Mentor
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            FX Checker
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            Projeto configurado com React, Vite, TypeScript e Tailwind CSS. Use
            este ponto de partida para estruturar o conversor, historico,
            comparacao, favoritos e log.
          </p>
          <div className="w-full overflow-hidden">
            <LiveRatesGroup
              liveRatesList={[
                { currency: "EUR/GBP", value: 1.0, rate: 1.0 },
                { currency: "USD/CHF", value: 1.0, rate: -1.0 },
                { currency: "EUR/GBP", value: 1.0, rate: 1.0 },
                { currency: "USD/CHF", value: 1.0, rate: -1.0 },
                { currency: "EUR/GBP", value: 1.0, rate: 1.0 },
                { currency: "USD/CHF", value: 1.0, rate: -1.0 },
              ]}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
