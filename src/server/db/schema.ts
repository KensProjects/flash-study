import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `flash-study_${name}`);

export const UserRole = pgEnum("userRole", ["ADMIN", "BASIC", "BANNED"])

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).defaultNow(),
  image: text("image"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  role: UserRole("userRole").default("BASIC").notNull(),
  isPrivate: boolean("isPrivate").notNull().default(false)
},
  (user) => ({
    idIdx: index("id_idx").on(user.id),
    nameIdx: index("name_idx").on(user.name)
  })
)

export const cards = createTable(
  "card",
  {
    id: text("id").primaryKey(),
    question: text('question').notNull().unique(),
    answer: text('answer').notNull(),
    createdById: text("createdById")
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    cardDeckId: text("cardDeckId").notNull().references(() => cardDecks.id, { onDelete: 'cascade' }),
  },
  (card) => ({
    createdByIdIdx: index("createdById_idx").on(card.createdById),
    questionIndex: index("question_idx").on(card.question),
  })
)

export const cardDecks = createTable(
  'cardDeck',
  {
    id: text("id").primaryKey(),
    name: text('name').notNull(),
    createdById: varchar("createdById")
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  }, (cardDeck) => ({
    cardDeckIdx: index("cardDeck_Idx").on(cardDeck.id, cardDeck.name)
  })
)

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  })
);


export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  })
);

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const cardDeckRelations = relations(cardDecks, ({ one, many }) => ({
  cards: many(cards),
  createdBy: one(users, { fields: [cardDecks.createdById], references: [users.id] }),
}))

export const cardRelations = relations(cards, ({ one }) => ({
  createdBy: one(users, { fields: [cards.createdById], references: [users.id] }),
  cardDeck: one(cardDecks, { fields: [cards.cardDeckId], references: [cardDecks.id] }),
}))

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  cards: many(cards),
  cardDecks: many(cardDecks)
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));
