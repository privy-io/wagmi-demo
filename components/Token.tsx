'use client';

import Wrapper from 'components/Wrapper';
import {shorten, type AddressString} from 'lib/utils';
import {useAccount, useToken} from 'wagmi';

import MonoLabel from './MonoLabel';

const Token = () => {
  const {chain} = useAccount();

  let contractAddress: AddressString | undefined;
  switch (chain?.id) {
    case 1:
      contractAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'; // USDC Mainnet
      break;
    case 5:
      contractAddress = '0x2f3a40a3db8a7e3d09b0adfefbce4f6f81927557'; // USDC Goerli (unofficial)
      break;
  }

  const {data, isError, isLoading} = useToken({
    address: contractAddress,
    enabled: !!contractAddress,
  });

  if (!chain) {
    return (
      <Wrapper title="useToken">
        <p>Loading...</p>
      </Wrapper>
    );
  }

  if (!contractAddress) {
    return (
      <Wrapper title="useToken">
        <p>Unsupported network. Please switch to Goerli or Mainnet.</p>
      </Wrapper>
    );
  }

  if (isError || !data) {
    return (
      <Wrapper title="useToken">
        <p>Error reading from contract.</p>
      </Wrapper>
    );
  } else if (isLoading) {
    return (
      <Wrapper title="useToken">
        <p>Loading...</p>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper title="useToken">
        <p>
          Name: <MonoLabel label={data?.name} />
        </p>
        <p>
          Symbol: <MonoLabel label={data?.symbol} />
        </p>
        <p>
          Address: <MonoLabel label={shorten(data?.address)} />
        </p>
        <p>
          Total Supply: <MonoLabel label={data?.totalSupply.value.toString()} />
        </p>
      </Wrapper>
    );
  }
};

export default Token;
