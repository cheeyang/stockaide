import axios from "axios";

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
};

//TODOL Set up axios defaults to include API KEY
