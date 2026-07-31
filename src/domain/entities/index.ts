export type LiveRatesType = {
  currency: string;
  value: number;
  change?: number;
};

export type CurrencyType = {
  code: string;
  name: string;
  symbol: string;
  favorite?: boolean;
};

export type TabButtonType = {
  id: number;
  label: string;
  counter?: number;
};

export type SelectItemType = {
  id: number;
  label: string;
  counter?: number;
};
