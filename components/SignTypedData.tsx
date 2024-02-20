'use client';

import Button from 'components/Button';
import {shorten} from 'lib/utils';
import {useAccount, useSignTypedData} from 'wagmi';

const SignTypedData = () => {
  const {chain} = useAccount();

  // All properties on a domain are optional
  const domain = {
    name: 'Ether Mail',
    version: '1',
    chainId: chain?.id,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  } as const;

  // The named list of all type definitions
  const types = {
    Person: [
      {name: 'name', type: 'string'},
      {name: 'wallet', type: 'address'},
    ],
    Mail: [
      {name: 'from', type: 'Person'},
      {name: 'to', type: 'Person'},
      {name: 'contents', type: 'string'},
    ],
  } as const;

  const message = {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  } as const;
  const {data, isError, isPending, isSuccess, signTypedData} = useSignTypedData();

  return (
    <>
      <h2 className="mt-6 text-2xl">useSignTypedMessage</h2>
      <Button
        disabled={isPending}
        onClick_={() => {
          signTypedData({
            primaryType: 'Mail',
            domain,
            types,
            message,
          });
        }}
        cta="Sign typed data!"
      />
      {isSuccess && <div>Signature: {shorten(data)}</div>}
      {isError && <div>Error signing message</div>}
    </>
  );
};

export default SignTypedData;
