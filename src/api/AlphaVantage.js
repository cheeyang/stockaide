import axios from "axios";
import get from "lodash/get";

const alphaVantageApi = axios.create({
  baseURL: "https://alphavantage.co/query",
  params: {
    apikey: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY
  }
});

//TODO Set up axios defaults to include API KEY
