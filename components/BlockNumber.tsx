import { useBlockNumber } from "wagmi";
import Wrapper from "components/Wrapper";

const BlockNumber = () => {
  const { data, isError, isLoading } = useBlockNumber();
  if (isLoading)
    return <Wrapper title="useBlockNumber">Fetching block number…</Wrapper>;
  if (isError)
    return (
      <Wrapper title="useBlockNumber">Error fetching block number</Wrapper>
    );
  return <Wrapper title="useBlockNumber">Block number: {String(data)}</Wrapper>;
};

export default BlockNumber;
