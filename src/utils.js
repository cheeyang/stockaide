export const StLogger = {
  log: (...message) =>
    console.log(
      "%cStLogger : ",
      "color: blue; background: beige; font-weight: 900;",
      ...message
    ),
  error: (...message) =>
    console.error(
      "%cStLogger : ",
      "color: yellow; background: red; font-weight: 900;",
      ...message
    )
};
