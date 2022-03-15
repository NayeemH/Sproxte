import { combineReducers } from "redux";
import authReducer from "./Auth.reducer";
import CartReducer from "./Cart.reducer";
import LandingReducer from "./Landing.reducer";
import DashboardReducer from "./Dashboard.reducer";
import paymentReducer from "./Payment.reducer";
import projectReducer from "./Project.reducer";

const reducer = combineReducers({
  auth: authReducer,
  landing: LandingReducer,
  cart: CartReducer,
  dashboard: DashboardReducer,
  payment: paymentReducer,
  project: projectReducer,
});

export default reducer;
