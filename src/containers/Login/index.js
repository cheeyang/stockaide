import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Input,
  FormControl,
  InputAdornment,
  InputLabel,
  IconButton,
  FormHelperText
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import makeStyles from "@material-ui/styles/makeStyles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  password: {
    margin: "10px"
  }
}));

const Login = props => {
  const [showPassword, setShowPassword] = useState();
  const [password, setPassword] = useState();
  const [isPasswordError, setIsPasswordError] = useState(false);
  const classes = useStyles();

  const handleLogin = () => {
    if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
      props.dispatch.auth.setUser("Guest");
      props.history.push("/dashboard");
    } else {
      setIsPasswordError(true);
    }
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };
  const toggleShowPassword = toShow => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const loginButton = document.getElementById("login");
    document.getElementById("password").addEventListener("keydown", event => {
      if (event.keyCode === 13) {
        loginButton.click();
      }
    });
  }, []);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <FormControl
        className={classes.password}
        required
        error={isPasswordError}
      >
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          onChange={handlePasswordChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={toggleShowPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {isPasswordError && (
          <FormHelperText error>Please Enter a Valid Password.</FormHelperText>
        )}
      </FormControl>
      <Button id="login" onClick={handleLogin}>
        Click to login
      </Button>
    </Grid>
  );
};

export default connect(
  undefined,
  dispatch => ({ dispatch })
)(withRouter(Login));
