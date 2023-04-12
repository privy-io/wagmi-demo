import { useEnsResolver } from "wagmi";
import Wrapper from "components/Wrapper";
import SmallTextArea from "components/SmallTextArea";

const EnsResolver = () => {
  const { data, isError, isLoading } = useEnsResolver({
    name: "vitalik.eth",
  });

  if (isLoading)
    return <Wrapper title="useEnsResolver">Fetching resolver…</Wrapper>;
  if (isError)
    return (
      <Wrapper title="useEnsResolver">Error fetching ens resolver</Wrapper>
    );
  return (
    <Wrapper title="useEnsResolver">
      ENS resolver for vitalik.eth:
      <SmallTextArea content={JSON.stringify(data, null, 2)} />
    </Wrapper>
  );
};

export default EnsResolver;
