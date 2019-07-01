import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from "../containers/Login";
import Dashboard from "../containers/Dashboard";

const styles = ({ background }) => ({
  appContent: {
    background: background.appContent
  },
  contentHeight: {
    flexGrow: 8.8
  }
});
const AppContent = props => {
  const { classes } = props;
  return (
    <Grid
      container
      item
      className={classes.appContent}
      classes={{
        container: classes.contentHeight
      }}
    >
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Dashboard} />
        </Switch>
      </Router>
    </Grid>
  );
};
export default withStyles(styles)(AppContent);
