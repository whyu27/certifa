import { createContext, useState, useEffect, useCallback } from 'react';
import { useAccount, useConnect, useDisconnect, useSwitchChain, useChainId } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { publicClient, CONTRACT_ADDRESS, CONTRACT_ABI, SEPOLIA_CHAIN_ID } from '../config/contract';
import { useWallet } from './useWallet';

export const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isLoadingRole, setIsLoadingRole] = useState(false);

  const isWrongNetwork = isConnected && chainId !== SEPOLIA_CHAIN_ID;

  // Check role & authorization via viem publicClient
  const checkAccountRole = useCallback(async (walletAddr) => {
    if (!walletAddr) {
      setIsAuthorized(false);
      setIsOwner(false);
      return;
    }

    setIsLoadingRole(true);
    try {
      const [authorized, ownerAddress] = await Promise.all([
        publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'isAuthorizedIssuer',
          args: [walletAddr]
        }).catch(() => false),
        publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'owner'
        }).catch(() => null)
      ]);

      setIsAuthorized(Boolean(authorized));
      setIsOwner(Boolean(ownerAddress && ownerAddress.toLowerCase() === walletAddr.toLowerCase()));
    } catch (err) {
      console.error('Error checking account role via viem:', err);
      setIsAuthorized(false);
      setIsOwner(false);
    } finally {
      setIsLoadingRole(false);
    }
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      checkAccountRole(address);
    } else {
      setIsAuthorized(false);
      setIsOwner(false);
    }
  }, [isConnected, address, checkAccountRole]);

  const connectWallet = useCallback(() => {
    const injectedConnector = connectors.find((c) => c.id === 'injected') || connectors[0];
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    }
  }, [connect, connectors]);

  const disconnectWallet = useCallback(() => {
    disconnect();
    setIsAuthorized(false);
    setIsOwner(false);
  }, [disconnect]);

  const switchToSepolia = useCallback(() => {
    if (switchChain) {
      switchChain({ chainId: sepolia.id });
    }
  }, [switchChain]);

  return (
    <WalletContext.Provider
      value={{
        account: address,
        isWalletConnected: isConnected,
        isAuthorized,
        isOwner,
        isLoadingRole,
        isWrongNetwork,
        isConnecting,
        connectWallet,
        disconnectWallet,
        switchToSepolia,
        refreshRole: () => checkAccountRole(address)
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export { useWallet };
