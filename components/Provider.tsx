import Wrapper from 'components/Wrapper';
import {usePublicClient} from 'wagmi';

import MonoLabel from './MonoLabel';

const Provider = () => {
  const provider = usePublicClient();

  return (
    <Wrapper title="useProvider">
      <p>
        Provider loaded: <MonoLabel label={provider ? 'success' : 'waiting'} />
      </p>
    </Wrapper>
  );
};

export default Provider;
