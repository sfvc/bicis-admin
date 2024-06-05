import { useState, useEffect } from 'react';

const Travels = () => {
  const [data, setData] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Connecting');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      setConnectionStatus('Open');
    };

    socket.onmessage = (event) => {
      try {
        const eventData = JSON.parse(event.data);
        if (eventData.event === 'front/031054167945') {
          setData(eventData.data);
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };

    socket.onclose = () => {
      setConnectionStatus('Closed');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('Error');
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <p>Received Data: {data}</p>
    </div>
  );
};

export default Travels;