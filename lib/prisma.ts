import "server-only";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

type PrismaGlobal = typeof globalThis & {
  // Cache the client across hot reloads so development does not open a new connection on every refresh.
  prisma?: PrismaClient;
};

const globalForPrisma = globalThis as PrismaGlobal;

function buildConnectionString(raw: string) {
  if (raw.includes("sslmode=")) {
    return raw.replace(/sslmode=[^&]+/i, "sslmode=no-verify");
  }

  return `${raw}${raw.includes("?") ? "&" : "?"}sslmode=no-verify`;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: buildConnectionString(process.env.DATABASE_URL || ""),
    }),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
