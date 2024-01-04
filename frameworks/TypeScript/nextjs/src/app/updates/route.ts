import { headers } from "@/utils";
import { NextRequest } from "next/server";
import { World } from "@/types";
import { sql } from "@/sql";

const generateRandomNumber = () => {
  return Math.ceil(Math.random() * 10000);
};
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const q = Math.min(Number(searchParams.get("q")) || 1, 500);

  const worlds: World[] = [];

  for (let i = 0; i < q; i++) {
    const world = await sql.begin(async (sql) => {
      const [world] = await sql<
        World[]
      >`SELECT id, randomnumber as randomNumber FROM world WHERE id = ${generateRandomNumber()}`;
      world.randomNumber = generateRandomNumber();
      await sql<
        World[]
      >`UPDATE world SET randomnumber = ${world.randomNumber} WHERE id = ${world.id}`;
      return world;
    });
    worlds.push(world);
  }

  return Response.json(worlds, headers);
}
