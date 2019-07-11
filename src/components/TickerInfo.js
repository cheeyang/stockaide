import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";

const TickerInfo = props => {
  const { tickerSymbol } = props;
  return (
    <Card raised>
      <CardHeader>
        <Typography variant="body2">{tickerSymbol}</Typography>
      </CardHeader>
      <CardContent />
    </Card>
  );
};

export default TickerInfo;

TickerInfo.propTypes = {
  tickerSymbol: PropTypes.string.isRequired,
  indicatorList: PropTypes.arrayOf("string")
};
