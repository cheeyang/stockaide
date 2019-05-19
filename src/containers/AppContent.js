import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import { blueGrey } from "@material-ui/core/colors";

const styles = ({ background }) => ({
  appContent: {
    background: background.appContent
  },
  contentHeight: {
    flexGrow: 8.8
  }
});
const AppContent = props => {
  const { classes } = props;
  return (
    <Grid
      container
      item
      className={classes.appContent}
      classes={{
        container: classes.contentHeight
      }}
    />
  );
};
export default withStyles(styles)(AppContent);
