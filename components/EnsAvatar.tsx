'use client';

import Wrapper from 'components/Wrapper';
import Image from 'next/image';
import {useEnsAvatar} from 'wagmi';

const EnsAvatar = () => {
  const {data, isError, isLoading} = useEnsAvatar({
    name: 'vitalik.eth',
  });
  if (isLoading) return <Wrapper title="useEnsAvatar">Fetching avatar…</Wrapper>;
  if (isError) return <Wrapper title="useEnsAvatar">Error fetching avatar</Wrapper>;
  return (
    <Wrapper title="useEnsAvatar">
      Avatar for vitalik.eth: {data && <Image src={data} alt="ENS avatar" width={50} height={50} />}
    </Wrapper>
  );
};

export default EnsAvatar;
