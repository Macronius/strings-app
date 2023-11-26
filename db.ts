import { Client, QueryResult } from "pg";
import { loadEnvConfig } from "@next/env";


const projectDir = process.cwd();
loadEnvConfig(projectDir);
// loadEnvConfig(process.cwd());

// helper function
export async function getClient(): Promise<Client> {
  // PRODUCTION
  if (process.env.POSTGRES_URL) {
    const client = new Client({
      connectionString: process.env.POSTGRES_URL + "?sslmode=require",
    });
    return client;
  }
  // DEVELOPMENT
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_NAME,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT!),
  });
  return client;
}

// UTILITY FUNCTION - dynamic db query helper to streamline the db connection
export async function sql(
  sql: string,
  values?: Array<any>
): Promise<QueryResult<any>> {
  const client = await getClient();
  //
  await client.connect();
  const res = await client.query(sql, values);
  await client.end();
  //
  return res;
}
