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
  fetchTickerByName
} from "../../api/Ibkr";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { select } from "../../store";
import EntitySelect from "../../components/EntitySelect";
import { IBKR_SEARCH_RES } from "../../api/constants";

const useStyles = makeStyles(theme => ({
  divider: {
    margin: "5px 0 15px 0"
  },
  authContainer: {
    width: "50%"
  },
  entitySelect: {
    width: "100%"
  },
  marginTop: {
    marginTop: "20px"
  }
}));

const Trade = props => {
  const classes = useStyles();
  const [pendingItems, setPendingItems] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState();
  const [isLoadingSearchResults, setIsLoadingSearchResults] = useState(false);

  const { ibkrAuth, dispatch } = props;

  const handleClick = async () => {
    console.log("authenticate clicked!");
    setPendingItems([...pendingItems, "authStatus"]);
    let auth;
    try {
      auth = await checkAuthenticationStatus();
    } catch (e) {
      console.error(e);
      window.open("https://localhost:5000");
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
      console.log("promiseArray", promiseArray);
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

  const handleSelectTicker = selectedTicker => {
    setSelectedTicker(selectedTicker);
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
          <Button className={classes.marginTop} onClick={handleClick}>
            Check Authentication
          </Button>
          <Typography variant="body1">
            Authentication status: {renderAuthStatus()}
          </Typography>
          <Grid
            item
            className={classNames(classes.entitySelect, classes.marginTop)}
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

export default connect(
  mapState,
  mapDispatch
)(Trade);
