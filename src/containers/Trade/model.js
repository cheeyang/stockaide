import reducers from "./reducers";
import selectors from "./selectors";
import effects from "./effects";
import { INITIAL_STATE } from "./constants";

const trade = {
  state: INITIAL_STATE,
  reducers,
  effects,
  selectors
};

export default trade;
