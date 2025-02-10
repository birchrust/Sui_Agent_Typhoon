"use server"

import { isValidSuiAddress } from "@mysten/sui/utils"
import { v4 as uuidv4 } from "uuid"
import { z } from "zod"

import { addResult } from "./result"

const contactFormSchema = z.object({
  address: z.string().refine((val) => isValidSuiAddress(val), {
    message: "Please enter a valid Sui address",
  }),
})

const response = {
  success: "",
  errors: { address: "" },
  apiError: null as string | null,
  data: "" as any,
}

export default async function analyticsAction(
  _prevState: any,
  formData: FormData
) {
  try {
    const contactFormData = Object.fromEntries(formData)

    const validatedContactFormData =
      contactFormSchema.safeParse(contactFormData)

    if (!validatedContactFormData.success) {
      const formFieldErrors =
        validatedContactFormData.error.flatten().fieldErrors
      return {
        ...response,
        errors: { address: formFieldErrors.address?.[0] || "" },
        apiError: null,
      }
    }

    const { address } = validatedContactFormData.data

    try {
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
        console.log("analytics:", result)
        if (result.status === 504) {
          return {
            ...response,
            apiError: "Request timeout. Please try again.",
          }
        }
        return {
          ...response,
          apiError: `Request failed: ${result.statusText || "Unknown error"}`,
        }
      }

      const data = await result.json()
      const id = uuidv4()
      const resultId = (await addResult(id, data?.meme1 ?? "", address)).id

      return {
        ...response,
        success: "Form submitted successfully",
        data: {
          ...data,
          resultId,
          address,
        },
        apiError: null,
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return {
          ...response,
          apiError: "Request timeout. Please try again.",
        }
      }

      return {
        ...response,
        apiError:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      }
    }
  } catch (e: any) {
    const error = e as Error
    return { ...response, apiError: "Unexpected error: " + error.message }
  }
}
