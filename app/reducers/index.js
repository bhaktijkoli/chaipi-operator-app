import { combineReducers } from "redux"

import auth from "./authReducer"
import shop from "./shopReducer"
import driver from "./driverReducer"

export default combineReducers({
  auth,
  shop,
  driver,
})
