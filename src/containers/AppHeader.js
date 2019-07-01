import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { blueGrey } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const styles = ({ background, palette }) => ({
  appHeader: {
    background: background.appBars
  },
  headerHeight: {
    flexGrow: 0.7
  }
});

const AppHeader = props => {
  const { classes, hidden } = props;

  if (hidden) return null;

  return (
    <Grid
      container
      primary
      className={classes.appHeader}
      classes={{ container: classes.headerHeight }}
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="title">Stock Aide</Typography>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(AppHeader);
AppHeader.propTypes = {
  hidden: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};
AppHeader.defaultProps = {
  hidden: false
};
