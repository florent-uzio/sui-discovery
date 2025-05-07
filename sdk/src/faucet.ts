import { getFaucetHost, requestSuiFromFaucetV2 } from "@mysten/sui/faucet"

type Host = "testnet" | "devnet" | "localnet"

export const getSui = async (address: string, host: Host) => {
  const response = await requestSuiFromFaucetV2({
    host: getFaucetHost(host),
    recipient: address,
  })
  console.log(response)
}
