import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import Divider from "@material-ui/core/Divider";
import { checkAuthenticationStatus } from "../../api/Ibkr";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { select } from "../../store";

const useStyles = makeStyles(theme => ({
  divider: {
    margin: "5px 0 15px 0"
  },
  authContainer: {
    width: "50%"
  }
}));

const Trade = props => {
  const classes = useStyles();
  const [pendingItems, setPendingItems] = useState([]);

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
    return ibkrAuth.toString();
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
          <Button onClick={handleClick}>Check Authentication</Button>
          <Typography variant="body1">
            Authentication status: {renderAuthStatus()}
          </Typography>
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
