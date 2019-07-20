import React from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Navbar from "../components/Navbar";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(({ background, palette, divider }) => ({
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
}));

const AppHeader = props => {
  const { hidden } = props;
  const classes = useStyles();

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

export default AppHeader;
AppHeader.propTypes = {
  hidden: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};
AppHeader.defaultProps = {
  hidden: false
};
