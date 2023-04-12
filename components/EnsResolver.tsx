import { useEnsResolver } from "wagmi";
import Wrapper from "components/Wrapper";

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
      Resolver for vitalike.eth:
      {JSON.stringify(data)}
    </Wrapper>
  );
};

export default EnsResolver;
