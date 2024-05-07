DO $$ BEGIN
 CREATE TYPE "userRole" AS ENUM('ADMIN', 'BASIC', 'BANNED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flash-study_account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "flash-study_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flash-study_cardDeck" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"createdById" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flash-study_card" (
	"id" text PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"createdById" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"cardDeckId" text NOT NULL,
	CONSTRAINT "flash-study_card_question_unique" UNIQUE("question")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flash-study_session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flash-study_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp DEFAULT now(),
	"image" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"userRole" "userRole" DEFAULT 'BASIC' NOT NULL,
	"isPrivate" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flash-study_verificationToken" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "flash-study_verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_userId_idx" ON "flash-study_account" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cardDeck_Idx" ON "flash-study_cardDeck" ("id","name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "createdById_idx" ON "flash-study_card" ("createdById");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "question_idx" ON "flash-study_card" ("question");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_userId_idx" ON "flash-study_session" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "id_idx" ON "flash-study_user" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "flash-study_user" ("name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flash-study_account" ADD CONSTRAINT "flash-study_account_userId_flash-study_user_id_fk" FOREIGN KEY ("userId") REFERENCES "flash-study_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flash-study_cardDeck" ADD CONSTRAINT "flash-study_cardDeck_createdById_flash-study_user_id_fk" FOREIGN KEY ("createdById") REFERENCES "flash-study_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flash-study_card" ADD CONSTRAINT "flash-study_card_createdById_flash-study_user_id_fk" FOREIGN KEY ("createdById") REFERENCES "flash-study_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flash-study_card" ADD CONSTRAINT "flash-study_card_cardDeckId_flash-study_cardDeck_id_fk" FOREIGN KEY ("cardDeckId") REFERENCES "flash-study_cardDeck"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flash-study_session" ADD CONSTRAINT "flash-study_session_userId_flash-study_user_id_fk" FOREIGN KEY ("userId") REFERENCES "flash-study_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
