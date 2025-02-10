"use client"

import { useState } from "react"
import { walrus } from "@/actions/walrus"
import {
  useCurrentWallet,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit"
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client"
import { useAtom } from "jotai"
import toast from "react-hot-toast"
import { Tooltip } from "react-tooltip"

import { WalrusLogo } from "@/app/components/resources/logos/WalrusLogo"
import { urlAtom } from "@/app/stores"
import { addressToBase36, build_txn, get_file_hash } from "@/app/utils"

const PACKAGEID =
  "0xc5bebae319fc9d2a9dc858b7484cdbd6ef219decf4662dc81a11dc69bb7a5fa7"

const rpcUrl = getFullnodeUrl("testnet")

const client = new SuiClient({ url: rpcUrl })

export const Publish = () => {
  const { currentWallet } = useCurrentWallet()

  const [status, setStatus] = useState("")

  const [digest, setDigest] = useState("")

  const [urls, setUrls] = useState<string[]>([])

  const [_, setUrl] = useAtom(urlAtom)

  const [result, setResult] = useState("")

  const file = new File([result], "content.txt", {
    type: "text/plain",
  })

  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction()

  const handleTransaction = async (digest: string) => {
    const transaction = await client.waitForTransaction({
      digest,
      options: {
        showObjectChanges: true,
      },
    })

    const object = transaction.objectChanges?.find((change: any) => {
      if ("objectType" in change) {
        return change.objectType == `${PACKAGEID}::site::Site`
      }
      return false
    })

    if (!object) {
      throw new Error("No object found in transaction")
    }

    setStatus("Published!")
    const new_url = `https://${addressToBase36("objectId" in object ? object.objectId : "")}.walrus.site/`
    setUrls([...urls, new_url])
    setUrl(new_url)

    toast.success("Published!", {
      position: "bottom-right",
      removeDelay: 1000,
    })
  }

  const signAndExecuteTransactionBlock = async () => {
    const toastId = toast.loading("Preparing...", {
      position: "bottom-right",
    })

    try {
      if (!file) throw new Error("No file to publish")
      if (!currentWallet?.accounts[0].address)
        throw new Error("No account found")
      if (!result) throw new Error("No content to publish")

      setStatus("Publishing...")
      const hash = await get_file_hash(file)

      toast.loading("Publishing to Walrus...", {
        id: toastId,
      })
      setStatus("Publishing to Walrus...")
      const formData = new FormData()
      formData.append("file", file)
      const resultWalrus = (await walrus(formData)) as any

      if (!resultWalrus.success || !resultWalrus.data) {
        throw new Error(resultWalrus.error || "Upload failed")
      }

      const blobId =
        resultWalrus.data?.alreadyCertified?.blobId ??
        resultWalrus.data?.newlyCreated.blobObject?.blobId

      if (!blobId) throw new Error("No blob id")

      toast.loading("Publishing to blockchain...", {
        id: toastId,
      })
      setStatus("Publishing to the blockchain...")
      const tx = build_txn({
        data: [{ name: file.name, blobId, fileHash: hash }],
        owner: currentWallet.accounts[0].address,
      })

      signAndExecuteTransaction(
        { transaction: tx },
        {
          onSuccess: (result) => {
            setDigest(result.digest)
            handleTransaction(result.digest)
              .then(() => {
                toast.success("Successfully published!", {
                  id: toastId,
                  duration: 3000,
                })
              })
              .catch((error) => {
                toast.error(error.message, {
                  id: toastId,
                  duration: 3000,
                })
              })
          },
        }
      )
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unknown error", {
        id: toastId,
        duration: 3000,
      })
    } finally {
      setStatus("wait")
    }
  }
  return (
    <div
      aria-label="publish"
      data-tooltip-id="publish"
      data-tooltip-content="Publish to walrus"
      className="flex h-auto w-auto cursor-pointer items-center justify-center gap-4 p-1 hover:text-pink-500"
      onClick={signAndExecuteTransactionBlock}
    >
      <WalrusLogo className="h-8 w-fit" />
      <Tooltip id="publish" offset={16} />
    </div>
  )
}
