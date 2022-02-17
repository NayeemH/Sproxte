import { combineReducers } from "redux";
import authReducer from "./Auth.reducer";
import CartReducer from "./Cart.reducer";
import LandingReducer from "./Landing.reducer";

const reducer = combineReducers({
  auth: authReducer,
  landing: LandingReducer,
  cart: CartReducer,
});

export default reducer;
