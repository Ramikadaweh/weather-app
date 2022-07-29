import { createStore } from "redux";
import UserReducer from "./reducer";

export const store = createStore(
    UserReducer
)