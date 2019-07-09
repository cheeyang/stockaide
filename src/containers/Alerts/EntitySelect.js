import React, { useState } from "react";
import get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";
import debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "react-select";
import PropTypes from "prop-types";

const styles = theme => ({});

const EntitySelect = props => {
  const { masterEntityList } = props;
  const [selectableOptions, setSelectableOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [searchString, setSearchString] = useState("");

  const getOptions = resultList =>
    resultList.map(result => {
      let option = {};
      option.value = cloneDeep(result);
      option.label = `${result.ticker} | ${result.name}`;
      return option;
    });

  function getSearchResults() {
    if (searchString.length < 1) {
      return getOptions(masterEntityList);
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
    const options = getOptions(newFilteredList);
    setSelectableOptions(options);
  }

  const debouncedSearch = debounce(getSearchResults, 500);

  const handleInputChange = searchStr => {
    setSearchString(searchStr);
    debouncedSearch();
  };

  const handleSelect = selectedOption => {
    props.onSelect();
    setSelectedOption(selectedOption);
  };

  return (
    <Select
      id="search"
      options={selectableOptions}
      value={!isEmpty(selectedOption) ? selectedOption : undefined}
      inputValue={!isEmpty(searchString) ? searchString : undefined}
      onChange={handleSelect}
      onInputChange={handleInputChange}
      placeholder="Seach by Company Name or Ticker Symbol"
    />
  );
};

export default withStyles(styles)(EntitySelect);

EntitySelect.propTypes = {
  onSelect: PropTypes.func
};

EntitySelect.defaultProps = {
  onSelect: () => {}
};
