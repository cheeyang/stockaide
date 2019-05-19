import { init } from "@rematch/core";
import selectPlugin from "@rematch/select";

const store = init({
  models: {},
  plugins: [selectPlugin()]
});

export default store;
