import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { fetchSimFinIdByTicker } from "../../api/SimFin";

const Dashboard = props => (
  <Grid container justify="center" alignItems="center">
    <Typography>Dashboard Page</Typography>
    <Button onClick={() => fetchSimFinIdByTicker("gpro")}>Hit API</Button>
  </Grid>
);

export default Dashboard;
