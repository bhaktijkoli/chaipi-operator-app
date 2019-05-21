import io from 'socket.io-client';
const host = '192.168.0.105';
const port = 8080;

import shopActions from './../actions/shopActions';

const socket = io(`http://${host}:${port}`);

let shopid = null;
let store = null;

socket.init = (component) => {
  store = component;
}

socket.subscribeShop = (id) => {
  shopid = id;
  socket.on('shop'+id, (data) => {
    data = JSON.parse(data);
    console.log("Recieved", data);
    if(data.action == "NEW_ORDER") {
      shopActions.getActiveOrders(store)
    }
  })
}

socket.subscribeOrder = (id) => {
  socket.on(id, (data) => {
    shopActions.getActiveOrders(store)
  })
}

socket.on('connect', () => {
  if(shopid) socket.subscribeShop(shopid)
});

export default socket;
