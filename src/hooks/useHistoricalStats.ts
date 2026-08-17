import { useEffect, useState } from "react";
import axios from "axios";

import { StatsType } from "../domain/entities";
import { getHistoricalRates, HistoricalRate } from "../utils/api";

const formatDate = (date: Date) => date.toISOString().slice(0, 10);

const getOneMonthRange = () => {
  const to = new Date();
  const from = new Date(to);

  from.setMonth(from.getMonth() - 1);

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

export const useHistoricalStats = (base: string, quote: string) => {
  const [stats, setStats] = useState<StatsType[]>(() => buildStats([]));
  const [latestRate, setLatestRate] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchHistoricalStats = async () => {
      try {
        const { from, to } = getOneMonthRange();

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
  }, [base, quote]);

  return { stats, latestRate, isLoading, error };
};
