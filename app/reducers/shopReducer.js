var initialState = {
  loaded: false,
  active_orders: [],
  recent_orders: [],
  products: [],
};

export default function reducer(state=initialState, action) {

  switch (action.type) {
    case "SHOP_SET_PRODUCTS": {
      return {...state, products: action.payload, loaded: true}
    }
    case "SHOP_SET_ACTIVE_ORDERS": {
      return {...state, active_orders: action.payload, loaded: true}
    }
    case "SHOP_SET_RECENT_ORDERS": {
      return {...state, recent_orders: action.payload, loaded: true}
    }
  }

  return state
}
