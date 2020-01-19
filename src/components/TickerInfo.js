import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import get from "lodash/get";
import { AV_SEARCH } from "../api/constants";
import { CircularProgress } from "@material-ui/core";
import { StLogger } from "../utils";

const useStyles = makeStyles(({ palette: { custom } }) => ({
  tickerCard: {
    marginTop: "100px",
    backgroundColor: custom.cards
  }
}));

const TickerInfo = ({ selectedTicker, tickerHistory }) => {
  StLogger.log("Ticker Info: ", tickerHistory);
  return (
    <>
      <Typography>{JSON.stringify(selectedTicker, undefined, 2)}</Typography>
      <Typography>{JSON.stringify(tickerHistory, undefined, 2)}</Typography>
    </>
  );
  // const { ticker, options } = props;
  // const symbol = get(ticker, ["value", AV_SEARCH.SYMBOL]);
  // console.log("Ticker Symbol: ", symbol);
  // const classes = useStyles();

  // const [indicatorValues, setIndicatorValues] = useState({});
  // const [indicatorValue, setIndicatorValue] = useState([]); // [indicator, true/false]

  // const [indicatorLoadingStatuses, setIndicatorLoadingStatuses] = useState({});
  // const [loading, setLoading] = useState([]); // [indicator, true/false]

  // useEffect(() => {
  //   options.indicatorList.forEach(async (indicator, index) => {
  //     setTimeout(() => setLoading([indicator, true]));
  //     const fetchIndicator = options.indicatorFetchFunctions[index];
  //     console.log("indicator: ", indicator);
  //     try {
  //       console.log(
  //         "indicatorLoadingStatuses before resolved: ",
  //         indicatorLoadingStatuses
  //       );
  //       const value = await fetchIndicator(symbol, options, indicator);
  //       setTimeout(setIndicatorValue([indicator, value]));
  //     } catch (error) {
  //       console.error(error);
  //       setTimeout(setIndicatorValue([indicator, "N/A"]));
  //     } finally {
  //       console.log(
  //         "indicatorLoadingStatuses after resolved : ",
  //         indicatorLoadingStatuses
  //       );
  //       setTimeout(setLoading([indicator, false]));
  //     }
  //   });
  // }, [symbol, options]);

  // //synchronously set loading statuses
  // useEffect(() => {
  //   setIndicatorLoadingStatuses({
  //     ...indicatorLoadingStatuses,
  //     [loading[0]]: loading[1]
  //   });
  // }, [loading]);
  // //synchronously set indicator values
  // useEffect(() => {
  //   setIndicatorValues({
  //     ...indicatorValues,
  //     [indicatorValue[0]]: indicatorValue[1]
  //   });
  // }, [indicatorValue]);

  // useEffect(() => {
  //   console.log("indicatorValues", indicatorValues);
  // }, [indicatorValues]);

  // useEffect(() => {
  //   console.log("indicatorLoadingStatuses", indicatorLoadingStatuses);
  // }, [indicatorLoadingStatuses]);

  // console.log("indicatorLoadingStatuses");
  // return (
  //   <Card raised className={classes.tickerCard}>
  //     <CardHeader title={get(ticker, "label")} />
  //     <CardContent>
  //       {options.indicatorList.map((indicator, i) => {
  //         console.log("$$$indicator : ", indicator);
  //         console.log(
  //           "$$$indicatorLoadingStatuses : ",
  //           indicatorLoadingStatuses
  //         );
  //         console.log(
  //           "$$$indicatorLoadingStatuses[indicator]: ",
  //           indicatorLoadingStatuses[indicator]
  //         );
  //         return (
  //           <Typography id={`${indicator}-${i}`} variant="body2">
  //             {`${indicator} : `}
  //             {indicatorLoadingStatuses[indicator] ? ( //check 'then' for promise object
  //               <CircularProgress color="secondary" size={12} />
  //             ) : (
  //               indicatorValues[indicator]
  //             )}
  //           </Typography>
  //         );
  //       })}
  //     </CardContent>
  //   </Card>
  // );
};

export default TickerInfo;

TickerInfo.propTypes = {
  ticker: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired
  }).isRequired,
  options: PropTypes.shape({
    indicatorList: PropTypes.arrayOf("string")
  })
};
