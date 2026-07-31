import axios from "axios";
import { useEffect, useState } from "react";

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

        const currencies = response.data.map((currency) => ({
          code: currency.iso_code,
          name: currency.name,
          symbol: currency.symbol,
          favorite: ["USD", "EUR", "GBP"].includes(currency.iso_code),
        }));

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
