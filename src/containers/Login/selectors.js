const getUser = () => state => state.auth.user;

const getIbkrAuth = () => state => state.auth.ibkrAuth;

const selectors = { getUser, getIbkrAuth };

export default selectors;
