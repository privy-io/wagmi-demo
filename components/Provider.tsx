import Wrapper from 'components/Wrapper';
import {useState} from 'react';
import {usePublicClient} from 'wagmi';

import MonoLabel from './MonoLabel';

const Provider = () => {
  const [ready, setReady] = useState(false);
  const provider = usePublicClient();

  return (
    <Wrapper title="useProvider">
      <p>
        Provider loaded: <MonoLabel label="success" />
      </p>
    </Wrapper>
  );
};

export default Provider;
