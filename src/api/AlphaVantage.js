import axios from "axios";
import get from "lodash/get";
import { AV_INTERVAL, AV_SERIES_TYPE } from "./constants";

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
const constructRsiRequest = (tickerSymbol, rsiOptions) => {
  return {
    params: {
      function: "RSI",
      symbol: tickerSymbol,
      interval: rsiOptions.interval,
      time_period: rsiOptions.timePeriod,
      series_type: rsiOptions.seriesType,
      apikey: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY
    }
  };
};
export const fetchTickerRsi = async (tickerSymbol, options) => {
  const rsiOptions = { ...defaultRsiOptions, ...options };
  const requestOptions = constructRsiRequest(tickerSymbol, rsiOptions);
  const res = await alphaVantageApi.get("", requestOptions);
  try {
    return res.data["Technical Analysis: RSI"];
  } catch (err) {
    throw res;
  }
};
