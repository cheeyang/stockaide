import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import Divider from "@material-ui/core/Divider";
import classNames from "classnames";
import {
  checkAuthenticationStatus,
  fetchTickerBySymbol,
  fetchTickerByName,
  fetchTickerHistory
} from "../../api/Ibkr";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { select } from "../../store";
import EntitySelect from "../../components/EntitySelect";
import { IBKR_SEARCH_RES } from "../../api/constants";
import TickerInfo from "../../components/TickerInfo";
import get from "lodash/get";
import { StLogger } from "../../utils";

const useStyles = makeStyles(theme => ({
  divider: {
    margin: "5px 0 15px 0"
  },
  authContainer: {
    width: "100%"
  },
  entitySelect: {
    width: "100%"
  },
  marginTop: {
    marginTop: "20px"
  }
}));

const Trade = ({ ibkrAuth, dispatch }) => {
  const classes = useStyles();
  const [pendingItems, setPendingItems] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState();
  const [isLoadingSearchResults, setIsLoadingSearchResults] = useState(false);
  const [tickerHistory, setTickerHistory] = useState([]);
  const [isAuthWindowOpened, setIsAuthWindowOpened] = useState(false);
  const [isLoadingHistory, setLoadingHistory] = useState(false);

  const handleAuthenticateClicked = async () => {
    StLogger.log("authenticate clicked!");
    setPendingItems([...pendingItems, "authStatus"]);
    let auth;
    try {
      auth = await checkAuthenticationStatus();
      if (!auth) {
        throw new Error("User is unauthenticated");
      }
    } catch (e) {
      StLogger.error(e);
      if (!isAuthWindowOpened) {
        window.open("https://localhost:5000");
        setIsAuthWindowOpened(true);
        StLogger.log("Setting isAuthWindowOpened...");
      }
    } finally {
      setPendingItems(pendingItems.filter(item => item !== "authStatus"));
    }
    dispatch.auth.setIbkrAuth(auth);
  };

  const renderAuthStatus = () => {
    if (pendingItems.includes("authStatus")) {
      return <CircularProgress color="primary" size={14} />;
    }
    if (!ibkrAuth) return "Not Authenticated";
    if (ibkrAuth === true) return "Authenticated!";
    return JSON.stringify(ibkrAuth);
  };

  /**@todo find out why this only works for symbol and not company name */
  const fetchResults = async searchString => {
    try {
      setIsLoadingSearchResults(true);
      const promiseArray = await Promise.all([
        fetchTickerBySymbol(searchString),
        fetchTickerByName(searchString)
      ]);
      StLogger.log("promiseArray", promiseArray);
      return promiseArray[0];
    } catch (error) {
      console.error(
        `Error: unable to fetch search results for symbol: "${searchString}".\n`,
        error
      );
    } finally {
      setIsLoadingSearchResults(false);
    }
  };

  const retrieveTickerHistory = async conid => {
    let res;
    try {
      setLoadingHistory(true);
      res = await fetchTickerHistory(conid);
      setTickerHistory(res && res.data);
    } catch (e) {
      StLogger.error(e);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleSelectTicker = selectedTicker => {
    setSelectedTicker(selectedTicker);
    retrieveTickerHistory(get(selectedTicker, "value.conid"));
  };

  return (
    <Grid container direction="column">
      <Grid container item justify="center">
        <Typography variant="title">Trade</Typography>
      </Grid>
      <Divider className={classes.divider} />
      <Grid container justify="center">
        <Grid
          container
          item
          justify="center"
          alignItems="center"
          direction="column"
          className={classes.authContainer}
        >
          <Button
            className={classes.marginTop}
            onClick={handleAuthenticateClicked}
          >
            Check Authentication
          </Button>
          <Typography variant="body1">
            Authentication status: {renderAuthStatus()}
          </Typography>
          <Grid
            container
            item
            className={classNames(classes.entitySelect, classes.marginTop)}
            justify="center"
            alignItems="center"
          >
            <EntitySelect
              searchFnOnKeyPress={fetchResults}
              onSelect={handleSelectTicker}
              displayAttributes={[
                IBKR_SEARCH_RES.SYMBOL,
                IBKR_SEARCH_RES.CPNY_HEADER
              ]}
              isLoading={isLoadingSearchResults}
            />
          </Grid>
          <Grid item>
            {selectedTicker && (
              <TickerInfo
                selectedTicker={selectedTicker}
                tickerHistory={tickerHistory}
                isLoading={isLoadingHistory}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapState = state => ({
  ibkrAuth: select.auth.getIbkrAuth(state)
});

const mapDispatch = dispatch => ({
  dispatch
});

export default connect(mapState, mapDispatch)(Trade);
