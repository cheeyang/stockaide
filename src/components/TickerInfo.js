import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import get from "lodash/get";
import { AV_SEARCH } from "../api/constants";
import { CircularProgress } from "@material-ui/core";
import { StLogger } from "../utils";
import Chart from "react-apexcharts";
import isEmpty from "lodash/isEmpty";

const options = {
  chart: {
    id: "basic-candlestick",
    type: "candlestick"
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
  }
};

const useStyles = makeStyles(({ palette: { custom } }) => ({
  tickerCard: {
    marginTop: "100px",
    backgroundColor: custom.cards
  },
  cardContent: {
    position: "relative"
  },
  seriesSpinner: {
    position: "absolute",
    left: "50%",
    top: "45%"
  }
}));

const prepSeries = tickerHistory => {
  return [];
};

const TickerInfo = ({ selectedTicker, tickerHistory }) => {
  const classes = useStyles();
  StLogger.log("selectedTicker: ", selectedTicker);
  StLogger.log("tickerHistory: ", tickerHistory);

  const series = prepSeries(tickerHistory);

  return (
    <Card raised className={classes.tickerCard}>
      <CardHeader title={get(selectedTicker, "label")} />
      <CardContent className={classes.cardContent}>
        <div className={classes.chartContainer}>
          <Chart
            type="candlestick"
            series={series}
            options={options}
            width={500}
          />
          {isEmpty(series) && (
            <CircularProgress
              className={classes.seriesSpinner}
              color="primary"
              size={14}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TickerInfo;

TickerInfo.propTypes = {
  ticker: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired
  }).isRequired,
  options: PropTypes.shape({
    indicatorList: PropTypes.arrayOf("string")
  })
};

const sampleFormat1 = [
  {
    data: [
      {
        x: new Date(2020, 1, 1),
        y: [20.5, 25.2, 15.2, 22.2]
      },
      {
        x: new Date(2020, 1, 2),
        y: [23.4, 25.2, 18.9, 24.2]
      },
      {
        x: new Date(2020, 1, 3),
        y: [25.5, 26.2, 18.2, 25.2]
      },
      {
        x: new Date(2020, 1, 4),
        y: [28.4, 35.2, 29.9, 32.2]
      }
    ]
  }
];

const sampleFormat2 = [
  {
    data: [
      [1548115200000, 149.51, 152.22, 147.44, 151.85],
      [1548633600000, 150.72, 155.22, 150.2, 154.74]
    ]
  }
];

const sampleFormat3 = [
  {
    data: [
      [1538856000000, [6593.34, 6600, 6582.63, 6600]],
      [1538856900000, [6595.16, 6604.76, 6590.73, 6593.86]]
    ]
  }
];
