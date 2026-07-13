import { useEffect, useState } from "react";
import axios from "axios";
import { LiveRatesType } from "../domain/entities";
import { api } from "../utils/api";

type FrankfurterRate = {
  base: string;
  quote: string;
  rate: number;
};

export const useLiveRates = () => {
  const [liveRatesList, setLiveRatesList] = useState<LiveRatesType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchLiveRates = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await api.get<FrankfurterRate[]>("/rates", {
          signal: controller.signal,
        });

        const liveRates = response.data.map((rate) => ({
          currency: `${rate.base}/${rate.quote}`,
          value: rate.rate,
          //change: rate.rate, // Assuming the rate is the change percentage for simplicity
        }));

        setLiveRatesList(liveRates);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setError("Nao foi possivel carregar as cotacoes.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void fetchLiveRates();

    return () => {
      controller.abort();
    };
  }, []);

  return { liveRatesList, isLoading, error };
};
