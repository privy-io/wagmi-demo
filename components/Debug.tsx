import {useEffect} from 'react';
import {usePrepareContractWrite, useContractWrite, useSwitchNetwork} from 'wagmi';

import {useWallets} from '@privy-io/react-auth';
import {usePrivyWagmi} from '@privy-io/wagmi-connector';

import erc20ABI from '../lib/erc20abi.json';
import Button from './Button';

const USDC_ADDRESS = '0x0FA8781a83E46826621b3BC094Ea2A0212e71B23'; // mumbai
const CHAIN_ID = 80001; // mumbai
// const USDC_ADDRESS = '0x07865c6e87b9f70255377e024ace6630c1eaa37f'; // goerli
// const CHAIN_ID = 5; // goerli
const SPENDER = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'; // vitalik.eth

const Debug = () => {
  const {setActiveWallet} = usePrivyWagmi();
  const {wallets} = useWallets();
  const {switchNetwork} = useSwitchNetwork();
  const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');

  useEffect(() => {
    // Set embedded wallet as active and switch it to CHAIN_ID
    if (embeddedWallet) {
      setActiveWallet(embeddedWallet);
      embeddedWallet.switchChain(CHAIN_ID);
    }
  }, [embeddedWallet, setActiveWallet]);

  const {config} = usePrepareContractWrite({
    address: USDC_ADDRESS,
    abi: erc20ABI,
    chainId: CHAIN_ID,
    functionName: 'approve',
    enabled: embeddedWallet?.chainId === `eip155:${CHAIN_ID}`,
    args: [SPENDER, 1],
  });
  const {write} = useContractWrite(config);

  return (
    <div>
      <Button cta="Switch to Mumbai" onClick_={() => switchNetwork?.(CHAIN_ID)} />
      <> </>
      <Button cta="Approve USDC" onClick_={() => write?.()} />
    </div>
  );
};

export default Debug;
