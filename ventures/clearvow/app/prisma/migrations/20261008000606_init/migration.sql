-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'COUPLE',
    "name" TEXT,
    "phone" TEXT,
    "emailVerifiedAt" DATETIME,
    "phoneVerifiedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VerificationCode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "consumedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "VerificationCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Metro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "singular" TEXT NOT NULL,
    "priceUnit" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "questionsJson" TEXT NOT NULL DEFAULT '[]'
);

-- CreateTable
CREATE TABLE "Vendor" (
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

-- CreateTable
CREATE TABLE "VendorImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vendorId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL DEFAULT '',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "VendorImage_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vendorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Package_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Couple" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "metroId" TEXT,
    "partnerAName" TEXT NOT NULL,
    "partnerAPronouns" TEXT,
    "partnerBName" TEXT NOT NULL,
    "partnerBPronouns" TEXT,
    "weddingDate" DATETIME,
    "guestCount" INTEGER,
    "budgetTotal" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Couple_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Couple_metroId_fkey" FOREIGN KEY ("metroId") REFERENCES "Metro" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BudgetItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "coupleId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "planned" INTEGER NOT NULL DEFAULT 0,
    "actual" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "BudgetItem_coupleId_fkey" FOREIGN KEY ("coupleId") REFERENCES "Couple" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "BudgetItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SavedVendor" (
    "coupleId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("coupleId", "vendorId"),
    CONSTRAINT "SavedVendor_coupleId_fkey" FOREIGN KEY ("coupleId") REFERENCES "Couple" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SavedVendor_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "coupleId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "eventDate" DATETIME,
    "venueName" TEXT,
    "guestCount" INTEGER,
    "budgetLow" INTEGER,
    "budgetHigh" INTEGER,
    "needsJson" TEXT NOT NULL DEFAULT '{}',
    "message" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'DELIVERED',
    "verifiedEmail" BOOLEAN NOT NULL DEFAULT false,
    "verifiedPhone" BOOLEAN NOT NULL DEFAULT false,
    "unlockedAt" DATETIME,
    "unlockPaymentId" TEXT,
    "unlockRefundedAt" DATETIME,
    "firstReplyAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Inquiry_coupleId_fkey" FOREIGN KEY ("coupleId") REFERENCES "Couple" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Inquiry_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Inquiry_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InquiryMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inquiryId" TEXT NOT NULL,
    "senderRole" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "InquiryMessage_inquiryId_fkey" FOREIGN KEY ("inquiryId") REFERENCES "Inquiry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QuoteFeedback" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inquiryId" TEXT NOT NULL,
    "matched" BOOLEAN NOT NULL,
    "quotedPrice" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "QuoteFeedback_inquiryId_fkey" FOREIGN KEY ("inquiryId") REFERENCES "Inquiry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RealWedding" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "metroId" TEXT NOT NULL,
    "venueVendorId" TEXT,
    "venueName" TEXT NOT NULL,
    "eventDate" DATETIME,
    "partnerAName" TEXT NOT NULL,
    "partnerBName" TEXT NOT NULL,
    "story" TEXT NOT NULL DEFAULT '',
    "coverUrl" TEXT,
    "guestCount" INTEGER,
    "budgetBand" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "submittedByVendorId" TEXT,
    "consentConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RealWedding_metroId_fkey" FOREIGN KEY ("metroId") REFERENCES "Metro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RealWedding_venueVendorId_fkey" FOREIGN KEY ("venueVendorId") REFERENCES "Vendor" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "RealWedding_submittedByVendorId_fkey" FOREIGN KEY ("submittedByVendorId") REFERENCES "Vendor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RealWeddingImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "realWeddingId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL DEFAULT '',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "RealWeddingImage_realWeddingId_fkey" FOREIGN KEY ("realWeddingId") REFERENCES "RealWedding" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RealWeddingCredit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "realWeddingId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    CONSTRAINT "RealWeddingCredit_realWeddingId_fkey" FOREIGN KEY ("realWeddingId") REFERENCES "RealWedding" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RealWeddingCredit_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vendorId" TEXT NOT NULL,
    "coupleId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Review_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_coupleId_fkey" FOREIGN KEY ("coupleId") REFERENCES "Couple" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SpotlightSlot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "metroId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "startsAt" DATETIME NOT NULL,
    "endsAt" DATETIME NOT NULL,
    CONSTRAINT "SpotlightSlot_metroId_fkey" FOREIGN KEY ("metroId") REFERENCES "Metro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SpotlightSlot_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SpotlightSlot_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AnalyticsEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT,
    "vendorId" TEXT,
    "propsJson" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AnalyticsEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "actorId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "diffJson" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_tokenHash_key" ON "Session"("tokenHash");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "VerificationCode_userId_channel_idx" ON "VerificationCode"("userId", "channel");

-- CreateIndex
CREATE UNIQUE INDEX "Metro_slug_key" ON "Metro"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_slug_key" ON "Vendor"("slug");

-- CreateIndex
CREATE INDEX "Vendor_metroId_categoryId_status_startingPrice_idx" ON "Vendor"("metroId", "categoryId", "status", "startingPrice");

-- CreateIndex
CREATE INDEX "Vendor_ownerId_idx" ON "Vendor"("ownerId");

-- CreateIndex
CREATE INDEX "VendorImage_vendorId_idx" ON "VendorImage"("vendorId");

-- CreateIndex
CREATE INDEX "Package_vendorId_idx" ON "Package"("vendorId");

-- CreateIndex
CREATE UNIQUE INDEX "Couple_userId_key" ON "Couple"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BudgetItem_coupleId_categoryId_key" ON "BudgetItem"("coupleId", "categoryId");

-- CreateIndex
CREATE INDEX "Inquiry_vendorId_status_createdAt_idx" ON "Inquiry"("vendorId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "Inquiry_coupleId_createdAt_idx" ON "Inquiry"("coupleId", "createdAt");

-- CreateIndex
CREATE INDEX "InquiryMessage_inquiryId_createdAt_idx" ON "InquiryMessage"("inquiryId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "QuoteFeedback_inquiryId_key" ON "QuoteFeedback"("inquiryId");

-- CreateIndex
CREATE UNIQUE INDEX "RealWedding_slug_key" ON "RealWedding"("slug");

-- CreateIndex
CREATE INDEX "RealWedding_metroId_status_publishedAt_idx" ON "RealWedding"("metroId", "status", "publishedAt");

-- CreateIndex
CREATE INDEX "RealWeddingImage_realWeddingId_idx" ON "RealWeddingImage"("realWeddingId");

-- CreateIndex
CREATE INDEX "RealWeddingCredit_vendorId_idx" ON "RealWeddingCredit"("vendorId");

-- CreateIndex
CREATE UNIQUE INDEX "RealWeddingCredit_realWeddingId_vendorId_role_key" ON "RealWeddingCredit"("realWeddingId", "vendorId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "Review_vendorId_coupleId_key" ON "Review"("vendorId", "coupleId");

-- CreateIndex
CREATE INDEX "SpotlightSlot_metroId_categoryId_endsAt_idx" ON "SpotlightSlot"("metroId", "categoryId", "endsAt");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_name_createdAt_idx" ON "AnalyticsEvent"("name", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_entityId_idx" ON "AuditLog"("entityType", "entityId");
