import axios from "axios";
import get from "lodash/get";

/**
 * function getSimFinId
 * @param ticker : string
 *
 */
export const fetchSimFinIdByTicker = async ticker => {
  const url = `https://simfin.com/api/v1/info/find-id/ticker/${ticker}`;
  var res = await axios.get(url, {
    params: {
      "api-key": process.env.REACT_APP_SIM_FIN_API_KEY
    }
  });
  console.log(res);
  return res;
};

export const fetchSimFinIdByCpnyName = async name => {
  const url = `https://simfin.com/api/v1/info/find-id/ticker/${name}`;
  let res = await axios.get(url, {
    params: {
      "api-key": process.env.REACT_APP_SIM_FIN_API_KEY
    }
  });
  console.log(res);
  return res;
};

export const fetchAllEntities = async () => {
  const url = "https://simfin.com/api/v1/info/all-entities";
  let res = await axios.get(url, {
    params: {
      "api-key": process.env.REACT_APP_SIM_FIN_API_KEY
    }
  });
  console.log(res);
  return get(res, "data", []);
};

//TODO Set up axios defaults to include API KEY
