import Button from 'components/Button';
import MonoLabel from 'components/MonoLabel';
import {useNetwork, useSwitchNetwork} from 'wagmi';

const SwitchNetwork = () => {
  const {chain} = useNetwork();

  const {
    chains,
    error: switchNetworkError,
    isLoading: networkLoading,
    pendingChainId,
    switchNetwork,
  } = useSwitchNetwork({
    throwForSwitchChainNotSupported: true,
    onError(error) {
      console.log('Switch network error', error);
    },
    onMutate(args) {
      console.log('Switch network mutated:', args);
    },
    onSettled(data, error) {
      console.log('Switch network settled', {data, error});
    },
  });

  return (
    <>
      <h2 className="mt-6 text-2xl">useNetwork (chain switching)</h2>
      {chain && (
        <p>
          Connected to <MonoLabel label={chain.name} />
        </p>
      )}
      <div className="flex flex-row items-center gap-2">
        <p>Switch chains: </p>
        {chains.map((x) => (
          <Button
            disabled={!switchNetwork || x.id === chain?.id}
            key={x.id}
            onClick_={() => switchNetwork?.(x.id)}
            cta={networkLoading && pendingChainId === x.id ? ' (switching)' : x.name}
          />
        ))}
        {switchNetworkError && (
          <div>Network switch error: {JSON.stringify(switchNetworkError, null, 2)}</div>
        )}
      </div>
    </>
  );
};

export default SwitchNetwork;
