import { SAVE, CLEAR } from "./actions";

const initialState = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {
      name: "",
      email: "",
      country: "",
    };

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE:
      let user = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    case CLEAR:
      localStorage.removeItem("user");
      return {
        name: "",
        email: "",
        country: "",
      };
    default:
      return state;
  }
}
