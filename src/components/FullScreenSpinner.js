import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  fullHeight: {
    height: "100vh"
  }
}));

const FullScreenSpinner = props => {
  const classes = useStyles();
  return (
    <Modal disableBackdropClick open={!props.hidden}>
      <Grid
        container
        className={classes.fullHeight}
        justify="center"
        alignItems="center"
      >
        <CircularProgress />
      </Grid>
    </Modal>
  );
};

export default FullScreenSpinner;
