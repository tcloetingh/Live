const INITIAL_STATE = {
  AreWeSignedIn: null,
  userId: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, AreWeSignedIn: true, userId: action.payload };
    case "SIGN_OUT":
      return { ...state, AreWeSignedIn: false, userId: null };
    default:
      return state;
  }
};
