import io from 'socket.io-client';
const host = '192.168.0.105';
const port = 8080;

const socket = io(`http://${host}:${port}`);

socket.on('connect', () => {
  alert("Socket connected")
})

export default socket;
