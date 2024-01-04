import postgres from "postgres";

export const sql = postgres({
  host: "tfb-database",
  user: "benchmarkdbuser",
  password: "benchmarkdbpass",
  database: "hello_world",
  max: 1
});
