import React from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const handleClick = props => () => {
  props.dispatch.auth.setUser("Guest");
  props.history.push("/home");
};

const Login = props => {
  return (
    <Grid>
      <Typography>Login Page</Typography>
      <Button primary onClick={handleClick(props)}>
        Click to login
      </Button>
    </Grid>
  );
};

export default connect(
  undefined,
  dispatch => ({ dispatch })
)(withRouter(Login));
