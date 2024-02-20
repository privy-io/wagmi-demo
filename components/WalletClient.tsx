'use client';

import Wrapper from 'components/Wrapper';
import {useWalletClient} from 'wagmi';

import MonoLabel from './MonoLabel';

const WalletClient = () => {
  const {data: walletClient} = useWalletClient();

  return (
    <Wrapper title="useWalletClient">
      <p>
        WalletClient loaded: <MonoLabel label={walletClient ? 'success' : 'waiting'} />
      </p>
    </Wrapper>
  );
};

export default WalletClient;
