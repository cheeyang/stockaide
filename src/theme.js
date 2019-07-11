import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {
  blueGrey,
  red,
  green,
  blue,
  deepOrange,
  grey,
  cyan,
  brown,
  lime,
  lightGreen,
  teal
} from "@material-ui/core/colors";

/**
 * theme: 'light' or 'dark'
 */
const getTheme = theme =>
  createMuiTheme({
    palette: {
      type: theme,
      secondary: {
        main: grey[500]
      }
    },
    typography: {
      fontSize: 12,
      title: {
        color: theme === "dark" ? cyan[50] : blue[800]
      }
    },
    //Overrrides
    overrides: {
      MuiButton: {
        root: {
          backgroundColor: theme === "dark" ? blueGrey[700] : cyan[200]
        }
      }
    },
    // Custom Theme Variables
    background: {
      appBars: theme === "dark" ? blueGrey[700] : cyan[200],
      appContent: theme === "dark" ? blueGrey[900] : grey[50],
      cards: theme === "dark" ? teal["A700"] : lightGreen[50]
    },
    divider: {
      primary: theme === "dark" ? grey[100] : grey[800],
      secondary: theme === "dark" ? grey[300] : grey[600]
    },
    status: {
      success: green[300],
      pending: blue[400],
      warning: deepOrange[500],
      error: red[500]
    }
  });

export default getTheme;
