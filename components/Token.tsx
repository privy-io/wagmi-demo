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
      // https://developers.circle.com/stablecoins/docs/usdc-on-main-networks
      contractAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'; // USDC Mainnet
      break;
    case 11155111:
      // https://developers.circle.com/stablecoins/docs/usdc-on-test-networks
      contractAddress = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'; // USDC Sepolia
      break;
  }

  const {data, isError, isLoading} = useToken({
    address: contractAddress,
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
        <p>Unsupported network. Please switch to Sepolia or Mainnet.</p>
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
          Name: <MonoLabel label={data?.name ?? ''} />
        </p>
        <p>
          Symbol: <MonoLabel label={data?.symbol ?? ''} />
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
