import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";
import { MuiThemeProvider } from "@material-ui/core";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import getTheme from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import appConfig from "./config/appConfig";
import { StylesProvider, createGenerateClassName } from "@material-ui/styles";

const generateClassName = createGenerateClassName({
  productionPrefix: "prod-"
});

ReactDOM.render(
  <Provider store={store}>
    <StylesProvider generateClassName={generateClassName}>
      <CssBaseline />
      <MuiThemeProvider theme={getTheme(appConfig.theme)}>
        <ThemeProvider theme={getTheme(appConfig.theme)}>
          <App />
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
