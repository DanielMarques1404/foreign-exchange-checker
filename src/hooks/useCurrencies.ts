import axios from "axios";
import { useEffect, useState } from "react";

import { getCurrencyFlagSrc } from "../domain/currencyFlags";
import { CurrencyType } from "../domain/entities";
import { api } from "../utils/api";

type FrankfurterCurrency = {
  iso_code: string;
  name: string;
  symbol: string;
};

export const useCurrencies = () => {
  const [currenciesList, setCurrenciesList] = useState<CurrencyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCurrencies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await api.get<FrankfurterCurrency[]>("/currencies", {
          signal: controller.signal,
        });

        const currencies = response.data
          .map((currency): CurrencyType | null => {
            const flagSrc = getCurrencyFlagSrc(currency.iso_code);

            if (!flagSrc) return null;

            return {
              code: currency.iso_code,
              name: currency.name,
              symbol: currency.symbol,
              flagSrc,
              favorite: ["USD", "EUR", "GBP"].includes(currency.iso_code),
            };
          })
          .filter((currency): currency is CurrencyType => currency !== null)
          .sort((a, b) => a.name.localeCompare(b.name));

        setCurrenciesList(currencies);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setError("Nao foi possivel carregar as moedas.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void fetchCurrencies();

    return () => {
      controller.abort();
    };
  }, []);

  return { currenciesList, isLoading, error };
};
