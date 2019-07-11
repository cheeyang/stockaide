import React from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const handleClick = props => () => {
  props.dispatch.auth.setUser("Guest");
  props.history.push("/dashboard");
};

const Login = props => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography>Login Page</Typography>
      <Button onClick={handleClick(props)}>Click to login</Button>
    </Grid>
  );
};

export default connect(
  undefined,
  dispatch => ({ dispatch })
)(withRouter(Login));
