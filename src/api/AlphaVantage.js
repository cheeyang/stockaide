import axios from "axios";
import get from "lodash/get";

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
  console.log("API KEY: ", process.env.REACT_APP_ALPHA_VANTAGE_API_KEY);
  await alphaVantageApi.get("", {
    params: {
      function: "SYMBOL_SEARCH",
      keywords: searchString,
      apikey: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY
    }
  });
};
