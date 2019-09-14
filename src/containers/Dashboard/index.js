import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { fetchSimFinIdByTicker } from "../../api/SimFin";
import { useDispatch, useSelector } from "react-redux";
import { THEMES } from "../../constants";
import { select } from "../../store";

const Dashboard = props => {
  const dispatch = useDispatch();
  const themeName = useSelector(select.app.getTheme);
  const handleChangeTheme = () => {
    if (themeName === THEMES.DARK) {
      dispatch.app.setTheme(THEMES.LIGHT);
    } else {
      dispatch.app.setTheme(THEMES.DARK);
    }
  };

  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <Typography>Dashboard Page</Typography>
      <Button onClick={() => fetchSimFinIdByTicker("gpro")}>Hit API</Button>
      <br />
      <br />
      <Button onClick={handleChangeTheme}>Change Theme</Button>
    </Grid>
  );
};

export default Dashboard;
