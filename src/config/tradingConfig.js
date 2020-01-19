const tradingConfig = {
  algo1: {
    entry: {
      whiteList: ["Gpro", "ARNA"],
      macdGradient: 0,
      priceBelowMACD14: true,
      maxRSI14: 30,
      stablilityThreshold: 5,
      minStableDays: 3,
      maxLimitUSD: 600
    },
    exit: {
      minProfitMargin: 3,
      stablilityThreshold: 3,
      minStableDays: 1,
      minRSI14: 70
    },
    reEntry: {
      minDaysBetweenReEntry: 5,
      minChangeBeforeReEntry: 10
    }
  }
};

export default tradingConfig;
