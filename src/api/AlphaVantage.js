import axios from "axios";
import get from "lodash/get";
import { AV_INTERVAL, AV_SERIES_TYPE } from "./constants";
import max from "lodash/max";

const alphaVantageApi = axios.create({
  baseURL: "https://www.alphavantage.co/query"
  /** @todo remove this one deep merge PR is merged in axios */
  /*
  params: {
    apikey: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY
  }
  */
});

export const fetchSymbolSearch = async searchString => {
  const resultSet = await alphaVantageApi.get("", {
    params: {
      function: "SYMBOL_SEARCH",
      keywords: searchString,
      apikey: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY
    }
  });
  const matches = get(resultSet, "data.bestMatches");
  if (!matches) {
    throw resultSet;
  }
  return matches;
};

const defaultRsiOptions = {
  interval: AV_INTERVAL.DAILY,
  timePeriod: 60, //no. of data pts
  seriesType: AV_SERIES_TYPE.OPEN
};
const constructRsiRequest = (tickerSymbol, options) => {
  return {
    params: {
      function: "RSI",
      symbol: tickerSymbol,
      interval: options.interval,
      time_period: options.timePeriod,
      series_type: options.seriesType,
      apikey: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY
    }
  };
};
export const fetchTickerRsi = async (tickerSymbol, options) => {
  const rsiOptions = { ...defaultRsiOptions, ...options };
  const requestOptions = constructRsiRequest(tickerSymbol, rsiOptions);
  const res = await alphaVantageApi.get("", requestOptions);
  try {
    const rsiData = res.data["Technical Analysis: RSI"];
    const latestDate = max(Object.keys(rsiData));
    const latestRsi = get(rsiData, [latestDate, "RSI"]);
    return latestRsi;
  } catch (err) {
    throw res;
  }
};

const constructMacdRequest = (tickerSymbol, options) => {
  return {
    params: {
      function: "MACD",
      symbol: tickerSymbol,
      interval: options.interval,
      time_period: options.timePeriod,
      series_type: options.seriesType,
      apikey: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY
    }
  };
};
export const fetchTickerMacd = async (tickerSymbol, options) => {
  const macdOptions = { ...defaultRsiOptions, ...options };
  const requestOptions = constructMacdRequest(tickerSymbol, macdOptions);
  const res = await alphaVantageApi.get("", requestOptions);
  try {
    const rsiData = res.data["Technical Analysis: RSI"];
    const latestDate = max(Object.keys(rsiData));
    const latestRsi = get(rsiData, [latestDate, "RSI"]);
    return latestRsi;
  } catch (err) {
    throw res;
  }
};

const constructGenericRequest = (tickerSymbol, options, indicator) => {
  return {
    params: {
      function: indicator,
      symbol: tickerSymbol,
      interval: options.interval,
      time_period: options.timePeriod,
      series_type: options.seriesType,
      apikey: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY
    }
  };
};
export const fetchGenericIndicator = async (
  tickerSymbol,
  options,
  indicator
) => {
  const fetchOptions = { ...defaultRsiOptions, ...options };
  const requestOptions = constructGenericRequest(
    tickerSymbol,
    fetchOptions,
    indicator
  );
  const res = await alphaVantageApi.get("", requestOptions);
  try {
    const indicatorData = res.data[`Technical Analysis: ${indicator}`];
    const latestDate = max(Object.keys(indicatorData));
    const latestIndicatorValue = get(indicatorData, [latestDate, indicator]);
    return latestIndicatorValue;
  } catch (err) {
    throw res;
  }
};

export const fetchPrice = async (tickerSymbol, options) => {
  const requestOptions = constructGenericRequest(
    tickerSymbol,
    options,
    "GLOBAL_QUOTE"
  );
  const res = await alphaVantageApi.get("", requestOptions);
  try {
    const price = res.data["Global Quote"]["05. price"];
    return price;
  } catch (err) {
    throw res;
  }
};
