import Wrapper from 'components/Wrapper';
import {useState} from 'react';
import {useWebSocketProvider} from 'wagmi';

import MonoLabel from './MonoLabel';

const WebSocketProvider = () => {
  const [ready, setReady] = useState(false);
  const provider = useWebSocketProvider();

  provider?.ready.then(() => {
    setReady(true);
  });

  if (!ready) {
    return (
      <Wrapper title="useWebSocketProvider">
        <p>
          WebSocket Provider loaded: <MonoLabel label="pending" />
        </p>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper title="useWebSocketProvider">
        <p>
          WebSocket Provider loaded: <MonoLabel label="success" />
        </p>
      </Wrapper>
    );
  }
};

export default WebSocketProvider;
