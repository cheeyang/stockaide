import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Navbar from "../components/Navbar";

const styles = ({ background, palette, divider }) => ({
  appHeader: {
    background: background.appBars
  },
  appHeaderLeft: {
    borderWidth: "0 1px 0 0",
    borderStyle: "solid",
    borderColor: divider.primary
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
      className={classes.appHeader}
      classes={{ container: classes.headerHeight }}
      justify="space-between"
      alignItems="center"
    >
      <Hidden xsDown>
        <Grid
          container
          item
          xs={3}
          md={2}
          justify="center"
          alignItems="center"
          className={classes.appHeaderLeft}
        >
          <Grid container item justify="center">
            <Typography variant="title">Stock Aide</Typography>
          </Grid>
        </Grid>
      </Hidden>
      <Grid
        container
        xs={9}
        md={10}
        item
        justify="center"
        className={classes.appHeaderRight}
      >
        <Navbar />
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
