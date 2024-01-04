import { headers } from "@/utils";

export async function GET() {
  return new Response("Hello, World!", headers);
}

