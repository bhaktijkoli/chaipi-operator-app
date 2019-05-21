var initialState = {
  active_orders: [],
};

export default function reducer(state=initialState, action) {

  switch (action.type) {
    case "SHOP_SET_ACTIVE_ORDERS": {
      return {...state, active_orders: action.payload}
    }
  }

  return state
}
