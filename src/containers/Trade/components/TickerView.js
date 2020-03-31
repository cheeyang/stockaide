import React from "react";
import { Grid } from "@material-ui/core";
import TickerChart from "../../../components/TickerChart";
import TickerViewParams from "./TickerViewParams";

const TickerView = ({ isLoading, selectedTicker }) => (
  <>
    <Grid item>
      <TickerViewParams />
    </Grid>
    <Grid item>
      <TickerChart isLoading={isLoading} selectedTicker={selectedTicker} />
    </Grid>
  </>
);

export default TickerView;
