const setUser = (state, user) => ({
  ...state,
  user
});

const setIbkrAuth = (state, ibkrAuth) => ({
  ...state,
  ibkrAuth
});

const reducers = {
  setUser,
  setIbkrAuth
};

export default reducers;
