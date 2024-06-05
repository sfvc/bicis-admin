import { useState, useEffect } from 'react';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import { initiateSocket, subscribeToChat } from './socket_util';
import { subscribe } from 'diagnostics_channel';

const Travels = () => {
  const [data, setData] = useState(null);

  // // URL del WebSocket
  // const socketUrl = 'http://localhost:1000';

  // // Usar el hook useWebSocket
  // const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  // // Efecto para manejar los mensajes recibidos
  // useEffect(() => {
  //   if (lastMessage !== null) {
  //     try {
  //       const eventData = JSON.parse(lastMessage?.data);
  //       if (eventData.event === 'front/031054167945') {
  //         setData(eventData.data);
  //       }

  //     } catch (error) {
  //       console.error('Error parsing JSON:', error);
  //     }
  //   }
  // }, [lastMessage]);

  // // Estado del WebSocket
  // const connectionStatus = {
  //   [ReadyState.CONNECTING]: 'Connecting',
  //   [ReadyState.OPEN]: 'Open',
  //   [ReadyState.CLOSING]: 'Closing',
  //   [ReadyState.CLOSED]: 'Closed',
  //   [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  // }[readyState];

  useEffect(()=>{
    initiateSocket('messageToServer')
    subscribeToChat((error, msg)=>{
        setData(msg);
    })
  },[])
  return (
    <div>
      {/* <p>Connection Status: {connectionStatus}</p> */}
      <p>Received Data: {JSON.stringify(data)}</p>
    </div>
  );
};

export default Travels;