'use client';

import Wrapper from 'components/Wrapper';
import {useFeeData} from 'wagmi';

import MonoLabel from './MonoLabel';

const FeeData = () => {
  const {data, isError, isLoading} = useFeeData();

  if (isError) {
    return (
      <Wrapper title="useFeeData">
        <p>Error getting fee data.</p>
      </Wrapper>
    );
  } else if (isLoading) {
    return (
      <Wrapper title="useFeeData">
        <p>Loading...</p>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper title="useFeeData">
        <p>
          Gas Price: <MonoLabel label={data?.formatted.gasPrice || ''} />
        </p>
        <p>
          Max Fee Per Gas: <MonoLabel label={data?.formatted.maxFeePerGas || ''} />
        </p>
        <p>
          Max Priority Fee Per Gas: <MonoLabel label={data?.formatted.maxPriorityFeePerGas || ''} />
        </p>
      </Wrapper>
    );
  }
};

export default FeeData;
