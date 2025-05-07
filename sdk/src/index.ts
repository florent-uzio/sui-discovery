import { getFullnodeUrl, SuiClient } from "@mysten/sui/client"
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519"
import * as dotenv from "dotenv"
dotenv.config()

const main = async () => {
  // use getFullnodeUrl to define Devnet RPC location
  const rpcUrl = getFullnodeUrl("testnet")

  // create a client connected to devnet
  const client = new SuiClient({ url: rpcUrl })

  // import the sender's keypair
  const secretKey = process.env.SECRET_KEY_1
  if (!secretKey) {
    throw new Error("Please set the SECRET_KEY_1 environment variable")
  }
  const keypair = Ed25519Keypair.fromSecretKey(secretKey)
  console.log("Keypair:", keypair.getPublicKey().toSuiAddress())

  const SHOPPING_LIST_ID = "0xa485bd404beeac8e790042a86e166e4bf43a715f936d506cbde441c602705906"

  const response = await client.getObject({ id: SHOPPING_LIST_ID, options: { showContent: true } })
  console.log("Object:", JSON.stringify(response, null, 2))

  const content = response.data?.content

  if (content && content.dataType === "moveObject" && "fields" in content) {
    const fields = content.fields as any
    const items = fields.items as string[]

    console.log("Shopping list items:", items)
  } else {
    console.log("Failed to read shopping list or list is empty.")
  }

  // const tx = new Transaction()
  // const target =
  //   "0xa0215e1b5907393891ead956a192decbc83722b45d20ff960a23708a17012734::shopping_list::add_item"

  // // const target = "0x68e8ddcf09475e5d74bca26e59511125f928c5bdd08a34682654ce01a0eeb7d2"
  // tx.moveCall({
  //   target,
  //   // function: "create",
  //   arguments: [tx.object(SHOPPING_LIST_ID), tx.pure.string("Bread")],
  // })

  // const result = await client.signAndExecuteTransaction({
  //   transaction: tx,
  //   signer: keypair,
  //   options: {
  //     showEffects: true,
  //   },
  // })

  // console.log("Created shopping list:", result)
}

// Call the main function
main().catch(console.error)
