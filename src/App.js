import React from "react";
import Grid from "@material-ui/core/Grid";
import "./App.css";
import withStyles from "@material-ui/core/styles/withStyles";
import AppHeader from "./containers/AppHeader";
import AppFooter from "./containers/AppFooter";
import AppContent from "./containers/AppContent";
import { connect } from "react-redux";
import { select } from "./store";

const styles = {
  appRoot: {
    height: "100vh"
  }
};

const App = props => {
  const { classes, user } = props;
  return (
    <Grid container direction="column" className={classes.appRoot}>
      <AppHeader hidden={!user} />
      <AppContent />
      <AppFooter hidden={!user} />
    </Grid>
  );
};

const mapState = state => {
  console.log("STATE: ", state);
  console.log("SELECT.AUTH: ", select.auth);
  return { user: select.auth.getUser(state) };
};

const mapDispatch = dispatch => ({
  dispatch
});

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(App));
