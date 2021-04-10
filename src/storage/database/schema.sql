CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS "Users" CASCADE;

DROP TABLE IF EXISTS "Groups" CASCADE;

DROP TABLE IF EXISTS "UsersGroups" CASCADE;

DROP TABLE IF EXISTS "Posts" CASCADE;

DROP TABLE IF EXISTS "Tags" CASCADE;

DROP TABLE IF EXISTS "PostsTags" CASCADE;

DROP TABLE IF EXISTS "Files" CASCADE;

DROP TABLE IF EXISTS "Answers" CASCADE;

CREATE TABLE IF NOT EXISTS "Users" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "firstName" VARCHAR(35) NOT NULL,
    "lastName" VARCHAR(35) NOT NULL,
    "profilePhoto" VARCHAR(35)
);

CREATE TABLE IF NOT EXISTS "Groups" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "name"  VARCHAR(105) NOT NULL
);

CREATE TABLE IF NOT EXISTS "UsersGroups" (
    "userId" UUID REFERENCES "Users"(id),
    "groupId" UUID REFERENCES "Groups"(id),
    PRIMARY KEY ("userId", "groupId")
);

CREATE TABLE IF NOT EXISTS "Posts" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "content" VARCHAR(510) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "userId" UUID NOT NULL REFERENCES "Users"(id),
    "groupId" UUID NOT NULL REFERENCES "Groups"(id)
);

CREATE TABLE IF NOT EXISTS "Tags" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "name" VARCHAR(35) NOT NULL
);

CREATE TABLE IF NOT EXISTS "PostsTags" (
    "postId" UUID REFERENCES "Posts"(id),
    "tagId" UUID REFERENCES "Tags"(id),
    PRIMARY KEY ("postId", "tagId")
);

CREATE TABLE IF NOT EXISTS "Files" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "uri" TEXT NOT NULL,
    "postId" UUID NOT NULL REFERENCES "Posts"(id)
);

CREATE TABLE IF NOT EXISTS "Answers" (
    "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "content" VARCHAR(510) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "userId" UUID NOT NULL REFERENCES "Users"(id),
    "postId" UUID REFERENCES "Posts"(id)
);
