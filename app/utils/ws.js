import io from 'socket.io-client';
const host = '192.168.0.105';
const port = 8080;

const socket = io(`http://${host}:${port}`);

let shopid = null;

socket.subscribeShop = (id) => {
  shopid = id;
  socket.on('shop'+id, (data) => {
    console.log("Recieved ", data);
  })
  console.log("Subscribe");
}

socket.subscribeOrder = (id, callback) => {
  socket.on(id, (data) => {
    callback(data);
  })
}

socket.on('connect', () => {
  console.log("Socket connected");
  if(shopid) socket.subscribeShop(shopid)
});

export default socket;
