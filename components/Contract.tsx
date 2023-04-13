import { useContract, useProvider } from "wagmi";
import Wrapper from "components/Wrapper";
import { useState } from "react";
import { shorten } from "lib/utils";
import MonoLabel from "./MonoLabel";

const Contract = () => {
  const [node, setNode] = useState<string | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [owner, setOwner] = useState<string | null>(null);

  const provider = useProvider();
  const contract = useContract({
    address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e", // ENS Mainnet and Goerli Registry
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "node",
            type: "bytes32",
          },
          {
            indexed: true,
            internalType: "bytes32",
            name: "label",
            type: "bytes32",
          },
          {
            indexed: false,
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "NewOwner",
        type: "event",
      },
    ],
    signerOrProvider: provider,
  });

  contract?.on("NewOwner", (node, label, owner) => {
    setNode(node);
    setLabel(label);
    setOwner(owner);
  });

  return (
    <Wrapper title="useContract">
      <p>
        Latest event:{" "}
        {node && label && owner ? (
          <MonoLabel
            label={`NewOwner(${shorten(node)}, ${shorten(label)}, ${shorten(
              owner
            )})`}
          />
        ) : (
          <MonoLabel label="Listening..." />
        )}
      </p>
    </Wrapper>
  );
};

export default Contract;
