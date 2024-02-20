'use client';

import MonoLabel from 'components/MonoLabel';
import {useAccount, useEnsName} from 'wagmi';

const EnsName = () => {
  const {address} = useAccount();
  const {data: ensName, isError, isLoading, status} = useEnsName({address});

  return (
    <>
      <h2 className="mt-6 text-2xl">useEnsName</h2>
      {isLoading && (
        <p>
          Ens loading: {isLoading}
          <br />
        </p>
      )}
      <p>
        Ens status: <MonoLabel label={status} />
        <br />
      </p>
      {isError && (
        <p>
          Ens error: {isError}
          <br />
        </p>
      )}
      {ensName ? (
        <p>
          Ens name: <MonoLabel label={ensName} />
        </p>
      ) : (
        <p>No ens name for this address.</p>
      )}
    </>
  );
};

export default EnsName;
