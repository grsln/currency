export interface IValute {
  CharCode: string;
  ID: string;
  Name: string;
  Nominal: number;
  NumCode: string;
  Previous: number;
  Value: number;
}

export interface IState {
  toolkit: {
    isLoading: boolean;
    isError: boolean;
    repeatLoading: boolean;
    data: {
      date: string;
      previousDate: string;
      previousUrl: string;
      timestamp: string;
      valute: IValute[];
    };
  };
}

export enum PageEnum {
  "currencies" = 0,
  "converter" = 1,
}

export interface ITabPanelProps {
  index: number;
  value: number;
}

export interface IDifferent {
  currentValue: number;
  previousValue: number;
}
