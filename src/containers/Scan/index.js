import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { hardScan } from "../../api/Ibkr";
import { Typography } from "@material-ui/core";

const Scan = props => {
  const [scanResults, setScanResults] = useState();

  const handleClick = async () => {
    const res = await hardScan();
    setScanResults(res);
  };

  return (
    <Grid container justify="center" alignItems="center" direction="column">
      Scan Page
      <Button onClick={handleClick}>Hit API</Button>
      <Typography>{JSON.stringify(scanResults, undefined, 2)}</Typography>
    </Grid>
  );
};

export default Scan;
