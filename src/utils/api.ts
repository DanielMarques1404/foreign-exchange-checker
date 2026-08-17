import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "https://api.frankfurter.dev/v2",
  timeout: 10000,
});

export type HistoricalRate = {
  date: string;
  base: string;
  quote: string;
  rate: number;
};

type HistoricalRatesParams = {
  base: string;
  quote: string;
  from: string;
  to: string;
  signal?: AbortSignal;
};

export const getHistoricalRates = ({
  base,
  quote,
  from,
  to,
  signal,
}: HistoricalRatesParams) => {
  return api.get<HistoricalRate[]>("/rates", {
    params: {
      base,
      quotes: quote,
      from,
      to,
    },
    signal,
  });
};
