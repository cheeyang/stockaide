import React from "react";
import Grid from "@material-ui/core/Grid";
import "./App.css";
import withStyles from "@material-ui/core/styles/withStyles";
import AppHeader from "./containers/AppHeader";
import AppFooter from "./containers/AppFooter";
import AppContent from "./containers/AppContent";
import { Provider } from "react-redux";
import store from "./store";
import { MuiThemeProvider } from "@material-ui/core";
import getTheme from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import config from "./config";

const styles = {
  appRoot: {
    height: "100vh"
  }
};

const App = props => {
  const { classes } = props;
  return (
    <Provider store={store}>
      <CssBaseline />
      <MuiThemeProvider theme={getTheme(config.theme)}>
        <Grid container direction="column" className={classes.appRoot}>
          <AppHeader />
          <AppContent />
          <AppFooter />
        </Grid>
      </MuiThemeProvider>
    </Provider>
  );
};

export default withStyles(styles)(App);
