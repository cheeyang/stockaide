import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {
  blueGrey,
  red,
  green,
  blue,
  deepOrange
} from "@material-ui/core/colors";

/**
 * theme: 'light' or 'dark'
 */
const getTheme = theme =>
  createMuiTheme({
    palette: {
      type: theme
    },
    typography: {
      fontSize: 12
    },
    // Custom Theme Variables
    background: {
      primary: theme === "dark" ? blueGrey[700] : blueGrey[500],
      secondary: theme === "dark" ? blueGrey[900] : blueGrey[300]
    },
    status: {
      success: green[300],
      pending: blue[400],
      warning: deepOrange[500],
      error: red[500]
    }
  });

export default getTheme;
