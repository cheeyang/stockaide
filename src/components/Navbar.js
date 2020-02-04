import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import appConfig from "../config/appConfig";
import classNames from "classnames";
import makeStyles from "@material-ui/styles/makeStyles";
import { StLogger } from "../utils";

const useStyles = makeStyles(({ divider }) => ({
  navbarItem: {
    padding: "5px",
    cursor: "pointer"
  },
  appendDivider: {}
}));

const Navbar = props => {
  const { navbarItems } = appConfig;
  const classes = useStyles();

  const handleClickNavbarItem = item => event => {
    const { history } = props;
    StLogger.log("item clicked: ", item);
    history.push(item.route);
  };

  return (
    <Grid
      id="navbarContainer"
      container
      direction="row"
      justify="center"
      spacing={10}
    >
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

export default withRouter(Navbar);
