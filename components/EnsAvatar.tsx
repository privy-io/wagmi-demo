import Wrapper from 'components/Wrapper';
import Image from 'next/image';
import {useEnsAvatar} from 'wagmi';

const EnsAvatar = () => {
  const {data, isError, isLoading} = useEnsAvatar({
    address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045', // vitalik.eth
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
