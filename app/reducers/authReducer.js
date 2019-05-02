var initialState = {
  user: null,
  uid: null,
  update: 0,
}
export default function reducer(state=initialState, action) {

  switch (action.type) {
    case "AUTH_SET_USER": {
      return {...state, user: action.payload, shop: action.payload.shop}
    }
    case "AUTH_SET_UID": {
      return {...state, uid: action.payload.uid, phone: action.payload.phone}
    }
  }

  return state
}
