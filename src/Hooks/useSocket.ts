import io, { Socket } from 'socket.io-client';
let socket: Socket;

const useSocket = (url: string, channel: String) => {
  const initiateSocket = (room: string) => {
    socket = io(url);
    console.log(`Connecting socket...`);
    if (socket && room) socket.emit('join', room);
  }
  
  const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if(socket) socket.disconnect();
  }
  
  const subscribeToChat = (cb: (err: Error | null, msg: any) => void): boolean => {
      if (!socket) return true;
      socket.on(`${channel}`, (msg: any) => {
        console.log('Websocket event received!');
        cb(null, msg);
      });
      return true;
    }
    
  const sendMessage = (room: string, message: string): void => {
      if (socket) socket.emit('chat', { message, room });
  }

  return {
    initiateSocket,
    disconnectSocket,
    subscribeToChat,
    sendMessage
  }

}

export default useSocket;