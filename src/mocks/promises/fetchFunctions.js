import searchResponse from "../ibkr/secdef-search-acn.json";
import historyResponse from "../ibkr/marketdata-history.json";

export const mockSearch = async () => await searchResponse;

export const mockFetchHistory = async () => await historyResponse;
