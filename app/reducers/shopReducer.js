var initialState = {
  active_orders: [],
  products: [],
};

export default function reducer(state=initialState, action) {

  switch (action.type) {
    case "SHOP_SET_PRODUCTS": {
      return {...state, products: action.payload}
    }
    case "SHOP_SET_ACTIVE_ORDERS": {
      return {...state, active_orders: action.payload}
    }
  }

  return state
}
