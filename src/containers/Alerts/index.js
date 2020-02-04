import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import EntitySelect from "../../components/EntitySelect";
import Divider from "@material-ui/core/Divider";
import {
  fetchSymbolSearch,
  fetchTickerRsi,
  fetchTickerMacd,
  fetchGenericIndicator,
  fetchPrice
} from "../../api/AlphaVantage";
import TickerInfoAsync from "../../components/TickerInfoAsync";
import { AV_SEARCH, AV_INTERVAL, AV_SERIES_TYPE } from "../../api/constants";

const tickerInfoOptions = {
  indicatorList: ["RSI", "MACD", "Price"],
  indicatorFetchFunctions: [fetchTickerRsi, fetchGenericIndicator, fetchPrice],
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
  entitySelect: {
    width: "100%"
  }
}));

const Alerts = props => {
  const classes = useStyles();
  const [selectedTicker, setSelectedTicker] = useState();
  const [isLoadingSearchResults, setIsLoadingSearchResults] = useState(false);

  const showLoadingIndicator = () => {
    setIsLoadingSearchResults(true);
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
      setIsLoadingSearchResults(false);
    }
  };

  const handleSelectTicker = selectedTicker => {
    setSelectedTicker(selectedTicker);
  };

  return (
    <Grid container direction="column">
      <Grid container item justify="center">
        <Typography variant="title">Set Alerts</Typography>
      </Grid>
      <Divider className={classes.divider} />
      <Grid
        container
        item
        className={classes.entitySelect}
        justify="center"
        alignItems="center"
      >
        <EntitySelect
          searchFnOnKeyPress={fetchResults}
          onSelect={handleSelectTicker}
          displayAttributes={[AV_SEARCH.SYMBOL, AV_SEARCH.NAME]}
          isLoading={isLoadingSearchResults}
        />
      </Grid>
      <Grid item className={classes.tickerInfo}>
        {selectedTicker && (
          <TickerInfoAsync
            ticker={selectedTicker}
            options={tickerInfoOptions}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Alerts;
