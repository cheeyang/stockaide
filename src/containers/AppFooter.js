import React from "react";
import { blueGrey } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(({ palette: { custom } }) => ({
  appFooter: {
    background: custom.appBars
  },
  footerHeight: {
    height: "5vh"
  }
}));

const AppFooter = props => {
  const { hidden } = props;
  const classes = useStyles();

  if (hidden) return null;

  return (
    <Grid
      container
      item
      className={classes.appFooter}
      classes={{ container: classes.footerHeight }}
    />
  );
};

export default AppFooter;
AppFooter.propTypes = {
  hidden: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};
AppFooter.defaultProps = {
  hidden: false
};
