import reducers from "./reducers";
import selectors from "./selectors";
import { INITIAL_STATE } from "./constants";

const app = {
  state: INITIAL_STATE,
  reducers,
  selectors
};

export default app;
