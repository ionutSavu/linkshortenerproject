import { integer, pgTable, serial, text, timestamp, uniqueIndex, index } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

export const links = pgTable(
  'links',
  {
    id: integer('id').generatedAlwaysAsIdentity().primaryKey(),
    userId: text('user_id').notNull(),
    shortCode: text('short_code').notNull(),
    url: text('url').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('links_short_code_unique').on(table.shortCode),
    index('links_user_id_idx').on(table.userId),
  ]
);

export type SelectLink = InferSelectModel<typeof links>;
export type InsertLink = InferInsertModel<typeof links>;
