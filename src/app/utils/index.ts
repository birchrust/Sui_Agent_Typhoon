import { Deserializer, U256 } from "@aptos-labs/ts-sdk"
import { bcs } from "@mysten/bcs"
import { Transaction } from "@mysten/sui/transactions"
import { clsx, type ClassValue } from "clsx"
import { Base64 } from "js-base64"
import mime from "mime"

const PACKAGEID =
  "0xc5bebae319fc9d2a9dc858b7484cdbd6ef219decf4662dc81a11dc69bb7a5fa7"

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export function polar2cart(x = 0, y = 0, r = 0, theta = 0) {
  const dx = r * Math.cos(theta)
  const dy = r * Math.sin(theta)
  return [x + dx, y + dy]
}

export function normalizeUrl(url: string): string {
  // Remove leading/trailing whitespace
  let normalizedUrl = url.trim()

  // Check if it's a valid URL first
  try {
    new URL(normalizedUrl)
    return normalizedUrl
  } catch (e) {
    // If it doesn't have a protocol, add https://
    if (!/^[a-zA-Z]+:\/\//.exec(normalizedUrl)) {
      normalizedUrl = "https://" + normalizedUrl
    }
    console.error(e)
  }

  // Validate the URL again
  try {
    new URL(normalizedUrl)
    return normalizedUrl
  } catch (e) {
    // If still invalid, return empty string
    console.error(e)
    return ""
  }
}

export function idToBase36(id: Uint8Array) {
  const BASE36 = "0123456789abcdefghijklmnopqrstuvwxyz"
  const base = BASE36.length
  const source = id // Assuming `id` is a byte array or a Uint8Array
  const size = source.length * 2
  const encoding = new Array(size).fill(0)
  let high = size - 1

  for (const digit of source) {
    let carry = digit
    let it = size - 1
    while (it > high || carry !== 0) {
      carry += 256 * encoding[it]
      encoding[it] = carry % base
      carry = Math.floor(carry / base)
      it -= 1
    }
    high = it
  }

  const skip = encoding.findIndex((value) => value !== 0)
  const string = encoding
    .slice(skip)
    .map((c) => BASE36[c])
    .join("")

  return string
}

const mimeTypes: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".xml": "application/xml",
  ".csv": "text/csv",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".txt": "text/plain",
  ".md": "text/markdown",
  ".zip": "application/zip",
  ".tar": "application/x-tar",
  ".gz": "application/gzip",
  ".bz2": "application/x-bzip2",
  ".xz": "application/x-xz",
  ".rar": "application/x-rar-compressed",
  ".7z": "application/x-7z-compressed",
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx":
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".avi": "video/x-msvideo",
  ".mkv": "video/x-matroska",
  ".mov": "video/quicktime",
  ".flv": "video/x-flv",
  ".mpeg": "video/mpeg",
  ".mpg": "video/mpeg",
  ".ts": "video/mp2t",
}

export function getMimeType(filename: string): string {
  const ext = filename
    .slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
    .toLowerCase()

  return mimeTypes[`.${ext}`] ?? "application/octet-stream"
}

export function get_blobId(blobId: string) {
  const number = U256.deserialize(new Deserializer(Base64.toUint8Array(blobId)))

  return bcs.u256().fromHex(number.bcsToHex().toString())
}

export function get_blob(base64_blob: string): string {
  return bcs.u256().fromHex(
    U256.deserialize(new Deserializer(Base64.toUint8Array(base64_blob)))
      .bcsToHex()
      .toString()
  )
}

export function build_txn({
  data,
  owner,
}: {
  data: {
    name: string
    blobId: string
    fileHash: string
  }[]
  owner: string
}): Transaction {
  const txb = new Transaction()
  const site = txb.moveCall({
    package: PACKAGEID,
    module: "site",
    function: "new_site",
    arguments: [txb.pure.string("test page")],
  })
  data.forEach((item) => {
    const newRange = txb.moveCall({
      package: PACKAGEID,
      module: "site",
      function: "new_range_option",
      arguments: [txb.pure.vector("u64", []), txb.pure.vector("u64", [])],
    })

    const resource = txb.moveCall({
      package: PACKAGEID,
      module: "site",
      function: "new_resource",
      arguments: [
        txb.pure.string(`/${item.name}`),
        txb.pure.u256(get_blob(item.blobId)),
        txb.pure.u256(item.fileHash),
        newRange,
      ],
    })

    txb.moveCall({
      package: PACKAGEID,
      module: "site",
      function: "add_header",
      arguments: [
        resource,
        txb.pure.string("content-encoding"),
        txb.pure.string("identity"),
      ],
    })

    txb.moveCall({
      package: PACKAGEID,
      module: "site",
      function: "add_header",
      arguments: [
        resource,
        txb.pure.string("content-type"),
        txb.pure.string(mime.getType(item.name) ?? ""),
      ],
    })

    txb.moveCall({
      package: PACKAGEID,
      module: "site",
      function: "add_resource",
      arguments: [site, resource],
    })
  })

  txb.transferObjects([site], txb.pure.address(owner))
  return txb
}

export const get_file_hash = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()

  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer)

  const hashArray = Array.from(new Uint8Array(hashBuffer))

  return bcs
    .u256()
    .fromHex(
      hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("")
    )
}

export const addressToBase36 = (str: string) => {
  // https://sdk.mystenlabs.com/bcs#transforms
  const hex = BigInt(str)
  return hex.toString(36)
}
