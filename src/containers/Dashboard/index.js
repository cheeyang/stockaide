import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { fetchSimFinIdByTicker } from "../../api/SimFin";

const Dashboard = props => (
  <Grid container justify="center" alignItems="center">
    Dashboard Page
    <Button onClick={() => fetchSimFinIdByTicker("gpro")}>Hit API</Button>
  </Grid>
);

export default Dashboard;
