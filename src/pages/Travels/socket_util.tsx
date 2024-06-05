import io, { Socket } from 'socket.io-client';
let socket: Socket;

export const initiateSocket = (room: string) => {
  socket = io('http://localhost:1000');
  console.log(`Connecting socket...`);
  if (socket && room) socket.emit('join', room);
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}

export const subscribeToChat = (cb: (err: Error | null, msg: any) => void): boolean => {
    if (!socket) return true;
    socket.on('front/12', (msg: any) => {
      console.log('Websocket event received!');
      cb(null, msg);
    });
    return true;
  }
  
export const sendMessage = (room: string, message: string): void => {
    if (socket) socket.emit('chat', { message, room });
}