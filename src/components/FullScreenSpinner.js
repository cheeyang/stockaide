import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  fullHeight: {
    height: "100vh"
  }
});

const FullScreenSpinner = props => (
  <Modal disableBackdropClick open={!props.hidden}>
    <Grid
      container
      className={props.classes.fullHeight}
      justify="center"
      alignItems="center"
    >
      <CircularProgress />
    </Grid>
  </Modal>
);

export default withStyles(styles)(FullScreenSpinner);
