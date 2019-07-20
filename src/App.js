import React from "react";
import Grid from "@material-ui/core/Grid";
import "./App.css";
import AppHeader from "./containers/AppHeader";
import AppFooter from "./containers/AppFooter";
import AppContent from "./containers/AppContent";
import { connect } from "react-redux";
import { select } from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import FullScreenSpinner from "./components/FullScreenSpinner";
import isEmpty from "lodash/isEmpty";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  appRoot: {
    height: "100vh"
  }
}));

const App = props => {
  const { user, isLoading } = props;
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.appRoot}>
      <Router>
        {/* TODO: Set up navbar within header for navigation within menu item clicked in drawer*/}
        <FullScreenSpinner hidden={!isLoading} />
        <AppHeader hidden={!user} />
        <AppContent user={user} />
        <AppFooter hidden={!user} />
        {/* TODO: Set up Drawer Component for navigation to Portfolio, Trade, */}
      </Router>
    </Grid>
  );
};

const mapState = state => ({
  user: select.auth.getUser(state),
  isLoading: !isEmpty(select.app.getLoadingItems(state))
});

const mapDispatch = dispatch => ({ dispatch });

export default connect(
  mapState,
  mapDispatch
)(App);

/**
 * Search? Should this be forever in app bar?
 *
 * Portfolio
 * - Dashboard
 *
 * Market Watch
 * - Watchlist
 * - Create watchlist
 *
 * Trade
 * - Chart
 * - Order
 * - Order Status
 *
 * Alerts
 * - Manage Alerts
 *
 * Account (Last priority)
 * - UserId
 * - Password Reset
 *
 * Settings
 * - Theme
 * - Manage Notifications
 *
 */

/**@todo */
/**
 * Retrieve multiple indicators, such as GLOBAL_QUOTE(Price & Vol), MACD,
 *
 * Save Alerts to Firestore
 * Run Scheduled Functions using Google Cloud Platform to poll for selected tickers' alerts
 * Send email when criteria is met, for buy/sell action
 *
 * Login Flow using Firebase Authentication
 * Load Alerts from firestore depending on user
 *
 */
