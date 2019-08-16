import axios from "axios";
import get from "lodash/get";
import { AV_INTERVAL, AV_SERIES_TYPE } from "./constants";
import max from "lodash/max";

const ibkrApi = axios.create({
  baseURL: "https://localhost:5000/v1/portal",
  headers: {
    accept: "*",
    "Content-Type": "application/json"
  }
  /** @todo remove this one deep merge PR is merged in axios */
  /*
    params: {
      apikey: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY
    }
    */
});

export const checkAuthenticationStatus = async () => {
  const url = "/iserver/auth/status";
  const resultSet = await ibkrApi.get(url);
  return get(resultSet, "data.authenticated", resultSet);
};

export const tickle = () => {
  const url = "/tickle";
  console.log("tickling api to keep session open...");
  ibkrApi.get(url);
};

/** @param {value} string contains either companySymbol or companyName */
export const fetchTickerBySymbol = async value => {
  console.log("calling api for ticker symbol");
  const url = "/iserver/secdef/search";
  let resultSet;
  try {
    resultSet = await ibkrApi.post(
      url,
      {
        symbol: value,
        name: false,
        secType: "STK"
      },
      { timeout: 5000 }
    );
  } catch (err) {
    console.error("error fetching by symbol : ", err);
  }
  console.log("returning resultset: ", resultSet);
  return get(resultSet, "data", []);
};

/** @param {value} string contains either companySymbol or companyName */
export const fetchTickerByName = async value => {
  console.log("calling api for ticker name");
  const url = "/iserver/secdef/search";
  let resultSet;
  try {
    resultSet = await ibkrApi.post(
      url,
      {
        symbol: value,
        name: true,
        secType: "STK"
      },
      { timeout: 5000 }
    );
  } catch (err) {
    console.error("error fetching by name : ", err);
  }
  console.log("returning resultset: ", resultSet);
  return get(resultSet, "data", []);
};

/**@todo contract info, used for prefilling orders before submission */
// export const fetchContractInfo = async conId => {
//   const url = `/iserver/contract/${conId}/info`;
//   const response = ibkrApi.get(url);
//   return;
// };
