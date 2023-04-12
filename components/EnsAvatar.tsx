import { useEnsAvatar } from "wagmi";
import Wrapper from "components/Wrapper";

const EnsAvatar = () => {
  const { data, isError, isLoading } = useEnsAvatar({
    address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045", // vitalik.eth
  });
  if (isLoading)
    return <Wrapper title="useEnsAvatar">Fetching avatar…</Wrapper>;
  if (isError)
    return <Wrapper title="useEnsAvatar">Error fetching avatar</Wrapper>;
  return (
    <Wrapper title="useEnsAvatar">
      Avatar for vitalik.eth:{" "}
      {data && <img src={data} width="50px" height="50px" />}
    </Wrapper>
  );
};

export default EnsAvatar;
