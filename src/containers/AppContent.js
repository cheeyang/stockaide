import React from "react";
import Grid from "@material-ui/core/Grid";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import PropTypes from "prop-types";
import Alerts from "./Alerts";
import makeStyles from "@material-ui/styles/makeStyles";
import Trade from "./Trade";

const useStyles = makeStyles(({ background }) => ({
  appContent: {
    background: background.appContent,
    padding: "20px"
  },
  contentHeight: {
    flexGrow: 8.8
  }
}));
const AppContent = props => {
  const { user } = props;
  const classes = useStyles();

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
        <Route exact path="/trade" component={Trade} />
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
export default AppContent;
AppContent.propTypes = {
  user: PropTypes.string
};
