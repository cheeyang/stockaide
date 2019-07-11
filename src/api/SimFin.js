import axios from "axios";
import get from "lodash/get";

const simFinApi = axios.create({
  baseURL: "https://simfin.com/api/v1",
  params: {
    "api-key": process.env.REACT_APP_SIM_FIN_API_KEY
  }
});

/**
 * function getSimFinId
 * @param ticker : string
 *
 */
export const fetchSimFinIdByTicker = async ticker => {
  const url = `/info/find-id/ticker/${ticker}`;
  var res = await simFinApi.get(url);
  return res;
};

export const fetchSimFinIdByCpnyName = async name => {
  const url = `/info/find-id/ticker/${name}`;
  let res = await simFinApi.get(url);
  return res;
};

export const fetchAllEntities = async () => {
  const url = "/info/all-entities";
  let res = await simFinApi.get(url);
  return get(res, "data", []);
};
