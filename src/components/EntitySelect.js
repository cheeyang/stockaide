import React, { useState, useEffect } from "react";
import get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";
import makeStyles from "@material-ui/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Select from "react-select";
import PropTypes from "prop-types";
import { CircularProgress } from "@material-ui/core";

let debounceId;

const selectStyles = {
  // noOptionsMessage: (provided, state) => ({
  //   ...provided,
  //   "&:after": {
  //     content: `' (Loading...)'`
  //   }
  // })
};

const useStyles = makeStyles(theme => ({
  entitySearchWrapper: {
    position: "relative"
  },
  searchResultsLoading: {
    position: "absolute",
    zIndex: 2,
    left: "calc(50% - 14px)",
    top: "10%"
  }
}));

const EntitySelect = props => {
  const { masterEntityList, displayAttributes, isLoading } = props;
  const [selectableOptions, setSelectableOptions] = useState([]);
  const [isDebouncing, setIsDebouncing] = useState(true);
  const [selectedOption, setSelectedOption] = useState({});
  const [searchString, setSearchString] = useState("");
  const classes = useStyles();

  const getOptions = resultList => {
    console.log("resultList::: ", resultList);
    return resultList.map(result => {
      let option = {};
      option.value = cloneDeep(result);
      console.log("displayAttributes: ", displayAttributes);
      if (displayAttributes.length === 1) {
        option.label = result.displayAttributes[0];
      } else {
        let isFirstValue = true;
        option.label = displayAttributes.reduce((accumulator, attr) => {
          if (!result[attr]) {
            return "";
          }
          if (isFirstValue) {
            isFirstValue = false;
            return `${result[attr]}`;
          } else {
            return `${accumulator} | ${result[attr]}`;
          }
        }, "");
      }
      console.log("Option: ", option);
      return option;
    });
  };

  const filterResults = (masterEntityList, searchStringLC) =>
    masterEntityList.filter(entity =>
      displayAttributes.some(attr => {
        return (
          // lodash 'get' check entity[attr] to guard against null attr response by API.
          entity[attr] &&
          get(entity, [attr], "")
            .toLowerCase()
            .includes(searchStringLC)
        );
      })
    );

  async function getSearchResults() {
    let newFilteredList;
    try {
      if (props.searchFnOnKeyPress) {
        console.log("calling search function API...");
        newFilteredList = await props.searchFnOnKeyPress(searchString);
      } else {
        console.log("filtering on front end...");
        const searchStringLC = searchString.toLowerCase();
        newFilteredList = filterResults(masterEntityList, searchStringLC);
      }
    } catch (error) {
      console.error("filteredList assign failed, ", error);
      newFilteredList = [];
    }
    console.log("EntitySelect: newFilteredList: ", newFilteredList);
    const options = getOptions(newFilteredList);
    console.log("options generated: ", options);
    setSelectableOptions(options);
  }

  const handleInputChange = searchStr => {
    clearTimeout(debounceId);
    setIsDebouncing(true);
    debounceId = setTimeout(() => {
      setIsDebouncing(false);
    }, 700);
    setSearchString(searchStr);
  };

  useEffect(() => {
    console.log("searchString : ", searchString);
    if (searchString.length < 2) {
      console.log("no api called, search string length < 2");
      return;
    }
    if (!isDebouncing) {
      getSearchResults();
    }
  }, [searchString, isDebouncing]);

  /**
   * @param {object} selectedOption
   */
  const handleSelect = selectedOption => {
    props.onSelect(selectedOption);
    setSelectedOption(selectedOption);
  };

  return (
    <Grid id="entitySearchWrapper" className={classes.entitySearchWrapper}>
      {isLoading && (
        <CircularProgress
          size={30}
          color="primary"
          className={classes.searchResultsLoading}
        />
      )}
      <Select
        id="search"
        options={selectableOptions}
        value={!isEmpty(selectedOption) ? selectedOption : undefined}
        inputValue={!isEmpty(searchString) ? searchString : undefined}
        onChange={handleSelect}
        onInputChange={handleInputChange}
        placeholder="Seach by Company Name/Symbol"
        styles={selectStyles}
      />
    </Grid>
  );
};

export default EntitySelect;

EntitySelect.propTypes = {
  searchOnKeyPress: PropTypes.bool,
  onSelect: PropTypes.func,
  masterEntityList: PropTypes.array
};

EntitySelect.defaultProps = {
  onSelect: () => {},
  displayAttributes: ["ticker", "name"]
};
