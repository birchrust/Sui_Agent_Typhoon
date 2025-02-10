"use server"

import { db } from "@/db"
import { resultes } from "@/db/schema"
import { eq } from "drizzle-orm"

export const getResult = async (id: string) => {
  const data = await db.select().from(resultes).where(eq(resultes.id, id))
  return data
}
export const addResult = async (id: string, text: string, address: string) => {
  const result = await db
    .insert(resultes)
    .values({
      id,
      text,
      address,
    })
    .returning({
      id: resultes.id,
      text: resultes.text,
      address: resultes.address,
    })

  return result[0]
}
