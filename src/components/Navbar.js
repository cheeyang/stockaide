import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import appConfig from "../config/appConfig";
import classNames from "classnames";

const styles = ({ divider }) => ({
  navbarItem: {
    padding: "5px"
  },
  appendDivider: {}
});

const Navbar = props => {
  const { navbarItems } = appConfig;
  const { classes } = props;

  const handleClickNavbarItem = item => event => {
    const { history } = props;
    console.log("item clicked: ", item);
    history.push(item.route);
  };

  return (
    <Grid id="navbarContainer" container direction="row" justify="center">
      {navbarItems.map((item, index) => (
        <Grid
          item
          key={item.id}
          className={classNames(classes.navbarItem, {
            [`${classes.appendDivider}`]: index !== navbarItems.length - 1
          })}
          onClick={handleClickNavbarItem(item)}
        >
          <Typography id={item.id} variant="title">
            {item.label}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default withStyles(styles)(withRouter(Navbar));
