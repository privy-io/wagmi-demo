import Wrapper from 'components/Wrapper';
import {useWebSocketPublicClient} from 'wagmi';

import MonoLabel from './MonoLabel';

const WebSocketProvider = () => {
  const provider = useWebSocketPublicClient();

  return (
    <Wrapper title="useWebSocketProvider">
      <p>
        WebSocket Provider loaded: <MonoLabel label={provider ? 'success' : 'pending'} />
      </p>
    </Wrapper>
  );
};

export default WebSocketProvider;
