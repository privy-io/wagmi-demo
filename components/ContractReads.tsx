import { useContractReads } from "wagmi";
import Wrapper from "components/Wrapper";
import { useNetwork } from "wagmi";
import MonoLabel from "./MonoLabel";
import { shorten } from "lib/utils";
import { BigNumber } from "ethers";

const ContractReads = () => {
  const { chain } = useNetwork();

  if (!chain) {
    return (
      <Wrapper title="useContractReads">
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

  const tokenIds = [
    "51642261290124123987113999051891697215550265269061454558443363901899214720732", // larry.eth
    "79233663829379634837589865448569342784712482819484549289560981379859480642508", // vitalik.eth
    "14062575871350128443718633951695181303483154763428382743088027645582664757571", // dhof.eth
  ];
  const { data, isError, isLoading } = useContractReads({
    // @ts-ignore
    contracts: tokenIds.map((tokenId) => {
      return {
        address: contractAddress,
        abi: [
          {
            constant: true,
            inputs: [{ name: "tokenId", type: "uint256" }],
            name: "ownerOf",
            outputs: [{ name: "", type: "address" }],
            payable: false,
            stateMutability: "view",
            type: "function",
          },
        ],
        functionName: "ownerOf",
        args: [BigNumber.from(tokenId)],
      };
    }),
  });

  if (isError) {
    return (
      <Wrapper title="useContractReads">
        <p>Error reading from contract.</p>
      </Wrapper>
    );
  } else if (isLoading || !data) {
    return (
      <Wrapper title="useContractReads">
        <p>Loading...</p>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper title="useContractReads">
        {tokenIds.map((tokenId, index) => {
          return (
            <p>
              Owner of ENS Token ID {shorten(tokenId)}:{" "}
              {!data?.[index] ? (
                <MonoLabel label="Error. Token may not exist on this network." />
              ) : (
                <MonoLabel label={shorten(data?.[index] as string)} />
              )}
            </p>
          );
        })}
      </Wrapper>
    );
  }
};

export default ContractReads;
