import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../containers/Login";
import Dashboard from "../containers/Dashboard";
import PropTypes from "prop-types";
import Alerts from "./Alerts";

const styles = ({ background }) => ({
  appContent: {
    background: background.appContent
  },
  contentHeight: {
    flexGrow: 8.8
  }
});
const AppContent = props => {
  const { classes, user } = props;

  const renderRoutes = () => {
    if (!user) {
      return <Login />;
    }
    return (
      <React.Fragment>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/alerts" component={Alerts} />
      </React.Fragment>
    );
  };

  return (
    <Grid
      container
      item
      className={classes.appContent}
      classes={{
        container: classes.contentHeight
      }}
    >
      <Switch>{renderRoutes()}</Switch>
    </Grid>
  );
};
export default withStyles(styles)(AppContent);
AppContent.propTypes = {
  user: PropTypes.string
};
