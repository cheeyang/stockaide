const getUser = () => state => {
  console.log("SELECTOR: ", state);
  return state.user;
};

const selectors = {
  getUser
};

export default selectors;
