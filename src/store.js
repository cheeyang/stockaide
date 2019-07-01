import { init } from "@rematch/core";
import selectPlugin from "@rematch/select";
import auth from "./containers/Login/model";

const store = init({
  models: { auth },
  plugins: [selectPlugin()]
});

export const { select } = store;

export default store;
