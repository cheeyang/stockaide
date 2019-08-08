import axios from "axios";
import get from "lodash/get";
import { AV_INTERVAL, AV_SERIES_TYPE } from "./constants";
import max from "lodash/max";

const ibkrApi = axios.create({
  baseURL: "https://localhost:5000/v1/portal"
  /** @todo remove this one deep merge PR is merged in axios */
  /*
    params: {
      apikey: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY
    }
    */
});

export const checkAuthenticationStatus = async () => {
  const url = "/iserver/auth/status";
  const resultSet = await ibkrApi.get(url, {
    headers: {
      accept: "*",
      "Content-Type": "*"
    }
  });
  return resultSet;
};
