import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "react-select";
import { fetchAllEntities } from "../../api/SimFin";
import get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";
import debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";

const styles = theme => ({
  textField: {
    margin: "8px"
  }
});

const Alerts = props => {
  const [masterEntityList, setMasterEntityList] = useState([]);
  const [selectableOptions, setSelectableOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [searchString, setSearchString] = useState("");

  const getMasterEntityList = async () => {
    const allEntities = await fetchAllEntities();
    setMasterEntityList(allEntities);
  };

  function getSearchResults() {
    if (searchString.length < 1) {
      return [];
    }
    const searchStringLC = searchString.toLowerCase();
    const newFilteredList = masterEntityList.filter(result => {
      if (result.name && result.ticker) {
        return (
          get(result, "name", "")
            .toLowerCase()
            .includes(searchStringLC) ||
          get(result, "ticker", "")
            .toLowerCase()
            .includes(searchStringLC)
        );
      }
      return false;
    });
    const options = newFilteredList.map(result => {
      let option = {};
      option.value = cloneDeep(result);
      option.label = `${result.ticker} | ${result.name}`;
      return option;
    });
    setSelectableOptions(options);
  }

  const debouncedSearch = debounce(getSearchResults, 500);

  const handleInputChange = searchStr => {
    setSearchString(searchStr);
    debouncedSearch();
  };

  const handleSelect = selectedOption => {
    setSelectedOption(selectedOption);
  };

  useEffect(() => {
    getMasterEntityList();
  }, []);

  return (
    <Grid container justify="center" direction="column">
      <Grid container item justify="center">
        <Typography variant="title">Alerts</Typography>
      </Grid>
      <Grid item>
        <Select
          id="search"
          options={selectableOptions}
          value={!isEmpty(selectedOption) ? selectedOption : undefined}
          inputValue={!isEmpty(searchString) ? searchString : undefined}
          onChange={handleSelect}
          onInputChange={handleInputChange}
          placeholder="Seach by Company Name or Ticker Symbol"
        />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Alerts);
