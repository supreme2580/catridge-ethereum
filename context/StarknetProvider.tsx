'use client'

import { sepolia, mainnet, Chain } from '@starknet-react/chains'
import { StarknetConfig, voyager, Connector } from '@starknet-react/core'
import { RpcProvider } from 'starknet'
import ControllerConnector from '@cartridge/connector/controller'
 
// Define your contract addresses
const ETH_TOKEN_ADDRESS =
  '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'
 
// Initialize the connector with policies
const connector = new ControllerConnector({
  rpc: 'https://api.cartridge.gg/x/starknet/mainnet',
  policies: [
    {
      target: ETH_TOKEN_ADDRESS,
      method: 'approve',
      description: 'Approval description here',
    },
    {
      target: ETH_TOKEN_ADDRESS,
      method: 'transfer',
    },
  ],
})
 
// Configure RPC provider
function provider(chain: Chain) {
  switch (chain) {
    case mainnet:
      return new RpcProvider({
        nodeUrl: 'https://api.cartridge.gg/x/starknet/mainnet',
      })
    default:
      return new RpcProvider({
        nodeUrl: 'https://api.cartridge.gg/x/starknet/mainne',
      })
  }
}
 
export function StarknetProvider({ children }: { children: React.ReactNode }) {
  return (
    <StarknetConfig
      chains={[mainnet]}
      provider={provider}
      connectors={[connector as never as Connector]}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  )
}