import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    [...volumeUnits, ...massUnits].map((u) => db.unit.create({ data: u }))
  );
}

seed();

const volumeUnits = [
  { name: "tbsp" },
  { name: "tsp" },
  { name: "ml" },
  { name: "cl" },
  { name: "dl" },
  { name: "l" },
];
const massUnits = [{ name: "g" }, { name: "kg" }, { name: "oz" }];
