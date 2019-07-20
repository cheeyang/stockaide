import { init } from "@rematch/core";
import selectPlugin from "@rematch/select";
import app from "./model";
import auth from "./containers/Login/model";

const store = init({
  models: { app, auth },
  plugins: [selectPlugin()]
});

export const { select } = store;
export const { dispatch } = store;

export default store;
