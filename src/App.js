import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { MuiThemeProvider } from "@material-ui/core";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import loadTheme from "./theme";
import "./App.css";
import AppHeader from "./containers/AppHeader";
import AppFooter from "./containers/AppFooter";
import AppContent from "./containers/AppContent";
import { connect, useSelector } from "react-redux";
import { select } from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import FullScreenSpinner from "./components/FullScreenSpinner";
import isEmpty from "lodash/isEmpty";
import makeStyles from "@material-ui/styles/makeStyles";
import { tickle } from "./api/Ibkr";

const useStyles = makeStyles(theme => ({
  appRoot: {
    height: "100vh",
    width: "100vw"
  }
}));

const App = props => {
  const classes = useStyles();

  useEffect(() => {
    const timerId = setInterval(() => {
      console.log("executing every minute... ibkrAuth status: ", ibkrAuth);
      tickle();
    }, 60000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const theme = useSelector(select.app.getTheme);
  const user = useSelector(select.auth.getUser);
  const isLoading = !isEmpty(useSelector(select.app.getLoadingItems));
  const ibkrAuth = useSelector(select.auth.getIbkrAuth);

  return (
    <MuiThemeProvider theme={loadTheme(theme)}>
      <ThemeProvider theme={loadTheme(theme)}>
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
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default App;

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
 * Scanner
 * - Scan For ConIds Based On Criteria
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
