import { integer, pgTable, text } from "drizzle-orm/pg-core"

export const resultes = pgTable("resultes", {
  id: text("id").primaryKey().notNull(),
  text: text("text").notNull(),
  address: text("address").notNull(),
})

export type Result = {
  id: string
  text: string
  address: string
}
