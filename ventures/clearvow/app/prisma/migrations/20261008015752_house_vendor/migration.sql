-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vendor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ownerId" TEXT,
    "metroId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT,
    "description" TEXT NOT NULL DEFAULT '',
    "serviceArea" TEXT NOT NULL DEFAULT '',
    "website" TEXT,
    "instagram" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "startingPrice" INTEGER,
    "typicalLow" INTEGER,
    "typicalHigh" INTEGER,
    "siteFeeFrom" INTEGER,
    "perGuestFrom" INTEGER,
    "capacity" INTEGER,
    "priceConfirmedAt" DATETIME,
    "pledgeSignedAt" DATETIME,
    "plan" TEXT NOT NULL DEFAULT 'FREE',
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "styleTags" TEXT NOT NULL DEFAULT '',
    "isClaimed" BOOLEAN NOT NULL DEFAULT false,
    "isHouseVendor" BOOLEAN NOT NULL DEFAULT false,
    "stripeCustomerId" TEXT,
    "stripeSubId" TEXT,
    "planRenewsAt" DATETIME,
    "inquiryCount" INTEGER NOT NULL DEFAULT 0,
    "replyCount" INTEGER NOT NULL DEFAULT 0,
    "medianReplyHours" REAL,
    "quoteMatchRate" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Vendor_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Vendor_metroId_fkey" FOREIGN KEY ("metroId") REFERENCES "Metro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vendor_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Vendor" ("capacity", "categoryId", "contactEmail", "contactPhone", "createdAt", "description", "id", "inquiryCount", "instagram", "isClaimed", "medianReplyHours", "metroId", "name", "ownerId", "perGuestFrom", "plan", "planRenewsAt", "pledgeSignedAt", "priceConfirmedAt", "quoteMatchRate", "replyCount", "serviceArea", "siteFeeFrom", "slug", "startingPrice", "status", "stripeCustomerId", "stripeSubId", "styleTags", "tagline", "typicalHigh", "typicalLow", "updatedAt", "website") SELECT "capacity", "categoryId", "contactEmail", "contactPhone", "createdAt", "description", "id", "inquiryCount", "instagram", "isClaimed", "medianReplyHours", "metroId", "name", "ownerId", "perGuestFrom", "plan", "planRenewsAt", "pledgeSignedAt", "priceConfirmedAt", "quoteMatchRate", "replyCount", "serviceArea", "siteFeeFrom", "slug", "startingPrice", "status", "stripeCustomerId", "stripeSubId", "styleTags", "tagline", "typicalHigh", "typicalLow", "updatedAt", "website" FROM "Vendor";
DROP TABLE "Vendor";
ALTER TABLE "new_Vendor" RENAME TO "Vendor";
CREATE UNIQUE INDEX "Vendor_slug_key" ON "Vendor"("slug");
CREATE INDEX "Vendor_metroId_categoryId_status_startingPrice_idx" ON "Vendor"("metroId", "categoryId", "status", "startingPrice");
CREATE INDEX "Vendor_ownerId_idx" ON "Vendor"("ownerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
