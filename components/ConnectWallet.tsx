'use client'

import { useAccount, useConnect, useDisconnect } from '@starknet-react/core'
import { useEffect, useState } from 'react'
import ControllerConnector from '@cartridge/connector/controller'
// import { Button } from '@cartridge/ui-next'
 
export function ConnectWallet() {
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { address } = useAccount()
  const controller = connectors[0] as ControllerConnector
  const [username, setUsername] = useState<string>()

  console.log(address)
 
  useEffect(() => {
    if (!address) return
    controller.username()?.then((n) => setUsername(n))
  }, [address, controller])
 
  return (
    <div>
        <p>Account: {address}</p>
        {username && <p>Username: {username}</p>}
        <button onClick={() => disconnect()}>Disconnect</button>
        <button onClick={() => connect({ connector: controller })}>
          Connect
        </button>
    </div>
  )
}
