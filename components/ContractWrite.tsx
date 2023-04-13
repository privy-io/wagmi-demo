import { useContractWrite, usePrepareContractWrite } from "wagmi";
import Wrapper from "components/Wrapper";
import { useNetwork } from "wagmi";
import MonoLabel from "./MonoLabel";
import { shorten } from "lib/utils";
import Button from "./Button";

const wagmigotchiABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "caretaker",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "CaretakerLoved",
    type: "event",
  },
  {
    inputs: [],
    name: "clean",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "feed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAlive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBoredom",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getHunger",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSleepiness",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStatus",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUncleanliness",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "love",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "play",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sleep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const ContractWrite = () => {
  const { chain } = useNetwork();

  if (!chain) {
    return (
      <Wrapper title="useContractWrite">
        <p>Loading...</p>
      </Wrapper>
    );
  }

  let contractAddress: string;
  switch (chain.id) {
    case 1:
    case 5:
      contractAddress = "0xeCB504D39723b0be0e3a9Aa33D646642D1051EE1"; // WAGMIGOTCHI on Mainnet and Goerli
      break;
    default:
      return (
        <Wrapper title="useContractWrite">
          <p>Unsupported network. Please switch to Goerli or Mainnet.</p>
        </Wrapper>
      );
  }

  const { config } = usePrepareContractWrite({
    // @ts-ignore
    address: contractAddress,
    abi: wagmigotchiABI,
    functionName: "feed",
  });

  const { data, isLoading, isError, write } = useContractWrite(config);

  return (
    <Wrapper title="useContractWrite">
      <div className="px-2 py-1 text-sm text-white bg-red-400 rounded">
        We recommend doing this on goerli.
      </div>
      {data && !isError && (
        <p>
          Transaction hash: <MonoLabel label={shorten(data.hash)} />
        </p>
      )}
      {isError && <p>Error feeding Wagmigotchi.</p>}
      <Button
        disabled={isLoading}
        onClick_={() => write?.()}
        cta="Feed Wagmigotchi"
      />
    </Wrapper>
  );
};

export default ContractWrite;
