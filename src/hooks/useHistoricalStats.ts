import { useEffect, useState } from "react";
import axios from "axios";

import { HistoricalPeriod, StatsType } from "../domain/entities";
import { getHistoricalRates, HistoricalRate } from "../utils/api";

const formatDate = (date: Date) => date.toISOString().slice(0, 10);

const getHistoricalRange = (period: HistoricalPeriod) => {
  const to = new Date();
  const from = new Date(to);

  if (period === "1D") {
    from.setDate(from.getDate() - 1);
  }

  if (period === "1W") {
    from.setDate(from.getDate() - 7);
  }

  if (period === "1M") {
    from.setMonth(from.getMonth() - 1);
  }

  if (period === "3M") {
    from.setMonth(from.getMonth() - 3);
  }

  if (period === "1Y") {
    from.setFullYear(from.getFullYear() - 1);
  }

  if (period === "5Y") {
    from.setFullYear(from.getFullYear() - 5);
  }

  return {
    from: formatDate(from),
    to: formatDate(to),
  };
};

const buildStats = (rates: HistoricalRate[]): StatsType[] => {
  const sortedRates = [...rates].sort((a, b) => a.date.localeCompare(b.date));
  const open = sortedRates[0]?.rate;
  const last = sortedRates.at(-1)?.rate;
  const change = open !== undefined && last !== undefined ? last - open : undefined;
  const changePercent =
    open !== undefined && change !== undefined ? (change / open) * 100 : undefined;

  return [
    { label: "open", value: open, showPercent: false, showSign: false },
    { label: "last", value: last, showPercent: false, showSign: false },
    { label: "change", value: change, showPercent: false, showSign: true },
    {
      label: "% change",
      value: changePercent,
      showPercent: true,
      showSign: true,
      showTrendIcon: true,
    },
  ];
};

export const useHistoricalStats = (
  base: string,
  quote: string,
  period: HistoricalPeriod,
) => {
  const [stats, setStats] = useState<StatsType[]>(() => buildStats([]));
  const [latestRate, setLatestRate] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchHistoricalStats = async () => {
      try {
        const { from, to } = getHistoricalRange(period);

        setIsLoading(true);
        setError(null);

        const response = await getHistoricalRates({
          base,
          quote,
          from,
          to,
          signal: controller.signal,
        });
        const historicalStats = buildStats(response.data);

        setStats(historicalStats);
        setLatestRate(response.data.at(-1)?.rate);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setError("Nao foi possivel carregar o historico da cotacao.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void fetchHistoricalStats();

    return () => {
      controller.abort();
    };
  }, [base, period, quote]);

  return { stats, latestRate, isLoading, error };
};
