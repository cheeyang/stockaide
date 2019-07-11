import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import EntitySelect from "./EntitySelect";
import Divider from "@material-ui/core/Divider";
import { fetchSymbolSearch } from "../../api/AlphaVantage";
import TickerInfo from "../../components/TickerInfo";
import { AV_SEARCH, AV_INTERVAL, AV_SERIES_TYPE } from "../../api/constants";
import { CircularProgress } from "@material-ui/core";

const tickerInfoOptions = {
  indicatorList: ["RSI", "MACD"],
  interval: AV_INTERVAL.DAILY,
  seriesType: AV_SERIES_TYPE.OPEN,
  timePeriod: 20
};

const useStyles = makeStyles(theme => ({
  divider: {
    margin: "5px 0 15px 0"
  },
  cardInfo: {
    marginTop: "50px"
  },
  entitySearchWrapper: {
    position: "relative"
  },
  searchResultsLoading: {
    position: "absolute",
    zIndex: 2,
    left: "50%",
    top: "10%"
  }
}));

const Alerts = props => {
  const classes = useStyles();
  const [selectedTicker, setSelectedTicker] = useState();
  const [loadingSearchResults, setLoadingSearchResults] = useState(false);

  const showLoadingIndicator = () => {
    setLoadingSearchResults(true);
  };

  const fetchResults = async searchString => {
    try {
      showLoadingIndicator();
      return await fetchSymbolSearch(searchString);
    } catch (error) {
      console.error(
        `Error: unable to fetch search results for symbol: "${searchString}".\n`,
        error
      );
    } finally {
      setLoadingSearchResults(false);
    }
  };

  const handleSelectTicker = selectedTicker => {
    setSelectedTicker(selectedTicker);
  };

  useEffect(() => {}, [selectedTicker]);

  return (
    <Grid container direction="column">
      <Grid container item justify="center">
        <Typography variant="title">Set Alerts</Typography>
      </Grid>
      <Divider className={classes.divider} />
      <Grid
        id="entitySearchWrapper"
        item
        className={classes.entitySearchWrapper}
      >
        {loadingSearchResults && (
          <CircularProgress
            size={30}
            color="secondary"
            className={classes.searchResultsLoading}
          />
        )}
        <EntitySelect
          searchFnOnKeyPress={fetchResults}
          onSelect={handleSelectTicker}
          displayAttributes={[AV_SEARCH.SYMBOL, AV_SEARCH.NAME]}
        />
      </Grid>

      <Grid item className={classes.tickerInfo}>
        {selectedTicker && (
          <TickerInfo ticker={selectedTicker} options={tickerInfoOptions} />
        )}
      </Grid>
    </Grid>
  );
};

export default Alerts;
