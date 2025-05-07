import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519"
import { config } from "dotenv"
config()

const SECRET_KEY_1 = process.env.SECRET_KEY_1 ?? ""
const SECRET_KEY_2 = process.env.SECRET_KEY_2 ?? ""

export const KEYPAIR_1 = Ed25519Keypair.fromSecretKey(SECRET_KEY_1)
export const KEYPAIR_2 = Ed25519Keypair.fromSecretKey(SECRET_KEY_2)
