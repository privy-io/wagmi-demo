import { useSignMessage, useAccount } from "wagmi";
import Button from "components/Button";
import { shorten } from "lib/utils";
import { usePrivy } from "@privy-io/react-auth";

const SignMessage = () => {
  const { user } = usePrivy();
  const { address } = useAccount();
  const { isLoading: signLoading, signMessage } = useSignMessage({
    onSuccess() {
      console.log("Sign Message Success");
    },
  });
  return (
    <>
      <h2 className="mt-6 text-2xl">useSignMessage</h2>
      {!signLoading ? (
        <Button
          onClick_={() => {
            signMessage({
              message: `Signing with WAGMI\nWAGMI address: ${shorten(
                address
              )}\nPrivy address: ${shorten(user?.wallet?.address)}`,
            });
          }}
          cta="Sign!"
        />
      ) : (
        <p>Message is being signed...</p>
      )}
    </>
  );
};

export default SignMessage;
