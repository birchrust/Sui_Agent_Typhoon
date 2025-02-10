"use server"

export async function walrus(formData: FormData) {
  try {
    const file = formData.get("file") as File
    if (!file) {
      return {
        success: false,
        error: "No file provided",
      }
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const response = await fetch(
      "https://publisher.walrus-testnet.walrus.space/v1/blobs?epochs=1",
      {
        method: "PUT",
        body: buffer,
        headers: {
          accept: "*/*",
          "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
          "content-type": file.type || "application/octet-stream",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          referer: "https://publish.walrus.site/",
          "referrer-policy": "strict-origin-when-cross-origin",
        },
      }
    )

    if (!response?.ok) {
      const responseText = await response?.text()
      console.error("Upload failed with status:", response?.status)
      console.error("Response:", responseText)
      return {
        success: false,
        error: `Upload failed: ${response?.statusText}. ${responseText}`,
      }
    }

    const data = await response.json()

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error("Upload error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
