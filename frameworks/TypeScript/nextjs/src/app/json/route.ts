import { headers } from "@/utils";

export async function GET() {
  return Response.json({ message: "Hello, World!" }, headers);
}
