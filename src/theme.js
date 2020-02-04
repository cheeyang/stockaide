import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {
  blueGrey,
  red,
  green,
  blue,
  deepOrange,
  grey,
  cyan,
  lightGreen,
  teal
} from "@material-ui/core/colors";

/**
 * theme: 'light' or 'dark'
 */
const loadTheme = theme =>
  createMuiTheme({
    palette: {
      type: theme,
      secondary: {
        main: grey[500]
      },
      custom: {
        appBars: theme === "dark" ? blueGrey[700] : cyan[200],
        appContent: theme === "dark" ? blueGrey[900] : grey[50],
        cards: lightGreen[50],
        spinner: blue[800],
        primaryDivider: theme === "dark" ? grey[100] : grey[800],
        secondaryDivider: theme === "dark" ? grey[300] : grey[600],
        status: {
          success: green[300],
          pending: blue[400],
          warning: deepOrange[500],
          error: red[500]
        }
      }
    },
    typography: {
      fontSize: 12,
      title: {
        color: theme === "dark" ? cyan[50] : blue[800],
        weight: "bold"
      },
      body1: {
        color: theme === "dark" ? cyan[50] : blue[800]
      },
      body2: {
        color: theme === "dark" ? cyan[50] : blue[800],
        fontSize: 8
      }
    },
    //Overrrides
    overrides: {
      MuiButton: {
        root: {
          backgroundColor: theme === "dark" ? blueGrey[700] : cyan[200]
        }
      },
      MuiTypography: {
        root: {
          color: theme === "dark" ? cyan[50] : blue[800]
        }
      }
    }
  });

export default loadTheme;
