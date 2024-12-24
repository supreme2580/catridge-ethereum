"use client"

import { ConnectWallet } from '@/components/ConnectWallet'
import { useAccount, useExplorer } from '@starknet-react/core'
import { useCallback, useState } from 'react'
 
const ETH_CONTRACT =
  '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'
 
export const TransferEth = () => {
  const [submitted, setSubmitted] = useState<boolean>(false)
  const { account } = useAccount()
  const explorer = useExplorer()
  const [txnHash, setTxnHash] = useState<string>()
 
  const execute = useCallback(
    async (amount: string) => {
      if (!account) return
      setSubmitted(true)
      setTxnHash(undefined)
      try {
        const result = await account.execute([
          {
            contractAddress: ETH_CONTRACT,
            entrypoint: 'approve',
            calldata: ["0x05e01dB693CBF7461a016343042786DaC5A6000104813cF134a1E8B1D0a6810b", amount, '0x0'],
          },
          {
            contractAddress: ETH_CONTRACT,
            entrypoint: 'transfer',
            calldata: ["0x05e01dB693CBF7461a016343042786DaC5A6000104813cF134a1E8B1D0a6810b", amount, '0x0'],
          },
        ])
        setTxnHash(result.transaction_hash)
      } catch (e) {
        console.error(e)
      } finally {
        setSubmitted(false)
      }
    },
    [account],
  )
 
  if (!account) return null
 
  return (
    <div>
      <h2>Transfer ETH</h2>
      <button onClick={() => execute(BigInt(0.00233 * 10 ** 18).toString())} disabled={submitted} className='bg-black text-white p-2 rounded-md'>
        Transfer 0.005 ETH
      </button>
      {txnHash && (
        <p>
          Transaction hash:{' '}
          <a
            href={explorer.transaction(txnHash)}
            target="blank"
            rel="noreferrer"
          >
            {txnHash}
          </a>
        </p>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <div>
      <ConnectWallet />
      <TransferEth />
    </div>
  )
}