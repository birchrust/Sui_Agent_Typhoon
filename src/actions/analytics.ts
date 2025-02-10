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

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 seconds timeout

      const result = await fetch(process.env.API_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
        body: JSON.stringify({
          address: address,
        }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!result.ok) {
        if (result.status === 504) {
          return {
            ...response,
            apiError: "Request timeout. Please try again.",
          }
        }
        return {
          ...response,
          apiError: `Request failed: ${result.statusText || 'Unknown error'}`,
        }
      }

      const data = await result.json()
      return {
        ...response,
        success: "Form submitted successfully",
        data,
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return {
          ...response,
          apiError: "Request timeout. Please try again.",
        }
      }
      
      return {
        ...response,
        apiError: error instanceof Error ? error.message : "An unexpected error occurred",
      }
    }
  } catch (e: any) {
    return { ...response, apiError: "Unexpected error: " + e?.message }
  }
}
