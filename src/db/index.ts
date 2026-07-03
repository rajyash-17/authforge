import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema/users";
import {env} from "../config/env";

const connectionString = env.DATABASE_URL;

const client = postgres(connectionString);

export const db = drizzle(client,{
    schema,
});