'use client';

import Wrapper from 'components/Wrapper';
import {useBlockNumber} from 'wagmi';

const BlockNumber = () => {
  const {data, isError, isLoading} = useBlockNumber();
  if (isLoading) return <Wrapper title="useBlockNumber">Fetching block number…</Wrapper>;
  if (isError) return <Wrapper title="useBlockNumber">Error fetching block number</Wrapper>;
  return <Wrapper title="useBlockNumber">Block number: {String(data)}</Wrapper>;
};

export default BlockNumber;
