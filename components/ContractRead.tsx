import { useContractRead } from "wagmi";
import Wrapper from "components/Wrapper";
import { useNetwork } from "wagmi";
import MonoLabel from "./MonoLabel";
import { shorten } from "lib/utils";
import { BigNumber } from "ethers";
import { erc721ABI } from "wagmi";

const ContractRead = () => {
  const { chain } = useNetwork();

  if (!chain) {
    return (
      <Wrapper title="useContractRead">
        <p>Loading...</p>
      </Wrapper>
    );
  }

  let contractAddress: string;
  switch (chain.id) {
    case 1:
    case 5:
      contractAddress = "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85"; // ENS Mainnet and Goerli Base Registrar
      break;
    default:
      return (
        <Wrapper title="useContractReads">
          <p>Unsupported network. Please switch to Goerli or Mainnet.</p>
        </Wrapper>
      );
  }

  const tokenId =
    "51642261290124123987113999051891697215550265269061454558443363901899214720732"; // larry.eth
  const { data, isError, isLoading } = useContractRead({
    // @ts-ignore
    address: contractAddress,
    abi: erc721ABI,
    functionName: "ownerOf",
    args: [BigNumber.from(tokenId)],
  });

  if (isError) {
    return (
      <Wrapper title="useContractRead">
        <p>Error reading from contract.</p>
      </Wrapper>
    );
  } else if (isLoading) {
    return (
      <Wrapper title="useContractRead">
        <p>Loading...</p>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper title="useContractRead">
        <p>
          Owner of ENS Token ID {shorten(tokenId)}:{" "}
          {!data ? (
            <MonoLabel label="Error. Token may not exist on this network." />
          ) : (
            <MonoLabel label={shorten(data)} />
          )}
        </p>
      </Wrapper>
    );
  }
};

export default ContractRead;
