'use client';

import Button from 'components/Button';
import {shorten} from 'lib/utils';
import {useAccount, useSignMessage} from 'wagmi';

import {usePrivy} from '@privy-io/react-auth';

const SignMessage = () => {
  const {user} = usePrivy();
  const {address} = useAccount();
  const {data, isPending, isSuccess, isError, signMessage} = useSignMessage({
    mutation: {
      onSuccess: () => {
        console.log('Sign Message Success');
      },
    },
  });
  return (
    <>
      <h2 className="mt-6 text-2xl">useSignMessage</h2>
      <Button
        disabled={isPending}
        onClick_={() => {
          signMessage({
            message: `Signing with WAGMI\nWAGMI address: ${shorten(
              address,
            )}\nPrivy address: ${shorten(user?.wallet?.address)}`,
          });
        }}
        cta="Sign!"
      />
      {isSuccess && <div>Signature: {shorten(data)}</div>}
      {isError && <div>Error signing message</div>}
    </>
  );
};

export default SignMessage;
