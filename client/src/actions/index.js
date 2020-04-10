import streams from "../apis/stream";
import { CREATE_STREAM } from "./types";

export const signIn = userId => {
  return {
    type: "SIGN_IN",
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT"
  };
};

export const createStream = formValues => {
  return async dispatch => {
    const response = await streams.post("/streams", formValues);

    dispatch({ type: CREATE_STREAM, payload: response.data });
  };
};

// This is only imported in the component and connected to mapPropsToState
