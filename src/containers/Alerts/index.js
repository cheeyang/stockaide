import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { fetchAllEntities } from "../../api/SimFin";
import EntitySelect from "./EntitySelect";
import Divider from "@material-ui/core/Divider";
import withStyles from "@material-ui/core/styles/withStyles";
import { dispatch } from "../../store";
import sortBy from "lodash/sortBy";
import { fetchSymbolSearch } from "../../api/AlphaVantage";

const styles = theme => ({
  divider: {
    margin: "5px 0 15px 0"
  }
});

const Alerts = props => {
  const [masterEntityList, setMasterEntityList] = useState([]);

  const getMasterEntityList = async () => {
    try {
      dispatch.app.setLoading("fetchAllEntities", true);
      let allEntities = await fetchAllEntities();
      allEntities = sortBy(allEntities, ["ticker", "name"]);
      setMasterEntityList(allEntities);
    } catch (error) {
      console.error("Error while fetching all entities from simFinAPI");
    } finally {
      dispatch.app.setLoading("fetchAllEntities", false);
    }
  };

  useEffect(() => {
    getMasterEntityList();
  }, []);

  const fetchResults = async searchString => {
    try {
      return await fetchSymbolSearch(searchString);
    } catch (error) {
      console.error(
        `Error: unable to fetch search results for symbol: "${searchString}".\n`,
        error
      );
    }
  };

  return (
    <Grid container direction="column">
      <Grid container item justify="center">
        <Typography variant="title">Set Alerts</Typography>
      </Grid>
      <Divider className={props.classes.divider} />
      <Grid item>
        <EntitySelect masterEntityList={masterEntityList} />
      </Grid>
      <Grid item>
        <EntitySelect
          masterEntityList={masterEntityList}
          searchFnOnKeyPress={fetchResults}
          displayAttributes={["1. symbol", "2. name"]}
        />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Alerts);
