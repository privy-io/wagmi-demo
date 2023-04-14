import { useContractInfiniteReads } from "wagmi";
import Wrapper from "components/Wrapper";
import { useNetwork } from "wagmi";
import MonoLabel from "./MonoLabel";
import { shorten } from "lib/utils";
import { BigNumber } from "ethers";
import Button from "./Button";
import { erc721ABI } from "wagmi";

const ContractInfiniteReads = () => {
  const { chain } = useNetwork();

  if (!chain) {
    return (
      <Wrapper title="useContractInfiniteReads">
        <p>Loading...</p>
      </Wrapper>
    );
  }

  let contractAddress: string;
  switch (chain.id) {
    case 1:
      contractAddress = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"; // Mainnet Bored Ape Yacht Club
      break;
    case 5:
      contractAddress = "0xe29f8038d1a3445ab22ad1373c65ec0a6e1161a4"; // Goerli (unofficial) Bored Ape Yacht Club
      break;
    default:
      return (
        <Wrapper title="useContractInfiniteReads">
          <p>Unsupported network. Please switch to Goerli or Mainnet.</p>
        </Wrapper>
      );
  }

  const { data, isError, isLoading, fetchNextPage } = useContractInfiniteReads({
    cacheKey: "baycOwners",
    // @ts-ignore
    contracts(param = 0) {
      const args = [BigNumber.from(param)] as const;
      return [
        {
          address: contractAddress,
          abi: erc721ABI,
          functionName: "ownerOf",
          args,
        },
      ];
    },
    getNextPageParam: (_, pages) => pages.length + 1,
  });

  if (isError) {
    return (
      <Wrapper title="useContractInfiniteReads">
        <p>Error reading from contract.</p>
      </Wrapper>
    );
  } else if (isLoading) {
    return (
      <Wrapper title="useContractInfiniteReads">
        <p>Loading...</p>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper title="useContractInfiniteReads">
        <p>
          Owner of <MonoLabel label={shorten(contractAddress)} /> Token ID{" "}
          <MonoLabel label={data?.pages.length.toString() || "-1"} />:{" "}
          <MonoLabel
            label={shorten(data?.pages[data?.pages.length - 1].toString())}
          />
        </p>
        <Button
          disabled={isLoading || isError}
          onClick_={() => fetchNextPage?.()}
          cta="Query next token owner"
        />
      </Wrapper>
    );
  }
};

export default ContractInfiniteReads;
