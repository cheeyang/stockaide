import React from "react";
import { blueGrey } from "@material-ui/core/colors";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

const styles = {
  appFooter: {},
  footerHeight: {
    flexGrow: 0.5
  }
};
const AppFooter = props => {
  const { classes, hidden } = props;

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

export default withStyles(styles)(AppFooter);
AppFooter.propTypes = {
  hidden: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};
AppFooter.defaultProps = {
  hidden: false
};
