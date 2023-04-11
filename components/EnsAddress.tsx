import { useEnsAddress } from "wagmi";
import { shorten } from "lib/utils";
import MonoLabel from "components/MonoLabel";
import Wrapper from "components/Wrapper";

const EnsAddress = () => {
  const address = "vitalik.eth";
  const { data, isError, isLoading } = useEnsAddress({ name: address });
  if (isLoading)
    return <Wrapper title="useEnsAddress">Fetching address…</Wrapper>;
  if (isError)
    return <Wrapper title="useEnsAddress">Error fetching address</Wrapper>;
  return (
    <Wrapper title="useEnsAddress">
      Address for vitalik.eth: <MonoLabel label={shorten(data as string)} />
    </Wrapper>
  );
};

export default EnsAddress;
