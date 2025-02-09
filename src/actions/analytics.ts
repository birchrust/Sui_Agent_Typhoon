"use server"

import { isValidSuiAddress } from "@mysten/sui/utils"
import { z } from "zod"

const contactFormSchema = z.object({
  address: z.string().refine((val) => isValidSuiAddress(val), {
    message: "Please enter a valid Sui address",
  }),
})

export default async function analyticsAction(
  _prevState: any,
  formData: FormData
) {
  const response = {
    success: "",
    errors: { address: "" },
    apiError: "",
    data: "",
  }

  try {
    const contactFormData = Object.fromEntries(formData)

    const validatedContactFormData =
      contactFormSchema.safeParse(contactFormData)

    if (!validatedContactFormData.success) {
      const formFieldErrors =
        validatedContactFormData.error.flatten().fieldErrors
      return { ...response, errors: formFieldErrors }
    }

    const { address } = validatedContactFormData.data

    const result = await fetch(process.env.API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      body: JSON.stringify({
        address: address,
      }),
    })

    if (!result.ok) {
      throw new Error(`API request failed: ${result.statusText}`)
    }

    const data = await result.json()

    return { ...response, success: "true", data }
  } catch (e: any) {
    return { ...response, apiError: "Unexpected error: " + e?.message }
  }
}
