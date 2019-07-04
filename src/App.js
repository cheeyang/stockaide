import React from "react";
import Grid from "@material-ui/core/Grid";
import "./App.css";
import withStyles from "@material-ui/core/styles/withStyles";
import AppHeader from "./containers/AppHeader";
import AppFooter from "./containers/AppFooter";
import AppContent from "./containers/AppContent";
import { connect } from "react-redux";
import { select } from "./store";
import { BrowserRouter as Router } from "react-router-dom";

const styles = {
  appRoot: {
    height: "100vh"
  }
};

const App = props => {
  const { classes, user } = props;
  return (
    <Grid container direction="column" className={classes.appRoot}>
      <Router>
        {/* TODO: Set up navbar within header for navigation within menu item clicked in drawer*/}
        <AppHeader hidden={!user} />
        <AppContent user={user} />
        <AppFooter hidden={!user} />
        {/* TODO: Set up Drawer Component for navigation to Portfolio, Trade, */}
      </Router>
    </Grid>
  );
};

const mapState = state => ({ user: select.auth.getUser(state) });

const mapDispatch = dispatch => ({ dispatch });

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(App));

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
