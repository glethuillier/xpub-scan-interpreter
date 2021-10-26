type InterpretationStatus =
  | "perfect matching"
  | "nonduplicated extra operation"
  | "duplicated operation"
  | "nonspecific missing operation"
  | "dust"
  | "mismatching amounts"
  | "mismatching addresses"
  | "mismatching token amounts"
  | "mismatching token tickers";

interface Interpretation {
  interpretation: InterpretationStatus | string;
  certainty: boolean;
  interpretedItemsCount?: number;
  itemsData?: string[];
}

interface Comparison {
  imported: Partial<{
    date: string;
    amount: string;
    operationType: string;
    txid: string;
    address: string;
  }>;
  actual: Partial<{
    date: string;
    amount: string;
    operationType: string;
    txid: string;
    address: string;
  }>;
  status: string;
}

interface Statistics {
  occurrences: {
    comparisons: number;
    matches: number;
    mismatches: number;
  };
}

export { Interpretation, Comparison, Statistics };
