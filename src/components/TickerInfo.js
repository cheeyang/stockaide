import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import get from "lodash/get";
import { AV_SEARCH } from "../api/constants";
import { fetchTickerRsi } from "../api/AlphaVantage";
import max from "lodash/max";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(({ background }) => ({
  tickerCard: {
    marginTop: "100px",
    backgroundColor: background.cards
  }
}));

const TickerInfo = props => {
  const { ticker, options } = props;
  const symbol = get(ticker, ["value", AV_SEARCH.SYMBOL]);
  console.log("Ticker Symbol: ", symbol);
  const classes = useStyles();
  const [rsi, setRsi] = useState("");
  const [isTickerLoading, setIsTickerLoading] = useState(false);

  useEffect(() => {
    async function fetchTickerCallback() {
      try {
        setIsTickerLoading(true);
        const rsiData = await fetchTickerRsi(symbol, options);
        const latestDate = max(Object.keys(rsiData));
        const latestRsi = get(rsiData, [latestDate, "RSI"]);
        setRsi(latestRsi);
      } catch (error) {
        console.error(error);
        setRsi("N/A");
      } finally {
        setIsTickerLoading(false);
      }
    }
    fetchTickerCallback();
  }, [symbol, options]);

  return (
    <Card raised className={classes.tickerCard}>
      <CardHeader title={get(ticker, "label")} />
      <CardContent>
        <Typography variant="body2">
          RSI :{" "}
          {isTickerLoading ? (
            <CircularProgress color="secondary" size={15} />
          ) : (
            rsi
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TickerInfo;

TickerInfo.propTypes = {
  ticker: PropTypes.string.isRequired,
  indicatorList: PropTypes.arrayOf("string")
};
