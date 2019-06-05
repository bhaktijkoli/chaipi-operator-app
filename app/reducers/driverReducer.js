var initialState = {
  loaded: false,
  active_orders: [],
};

export default function reducer(state=initialState, action) {

  switch (action.type) {
    case "DRIVER_SET_ACTIVE_ORDERS": {
      return {...state, active_orders: action.payload, loaded: true}
    }
  }

  return state
}
