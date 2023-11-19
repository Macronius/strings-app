import { Client } from "pg";
import { loadEnvConfig } from "@next/env";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const projectDir = process.cwd();
// loadEnvConfig takes what is in .env.local file and loads as environment variables to make available using process.env
loadEnvConfig(projectDir);

async function loadFakeData(numUsers: number = 10) {
  // INSTANTIATE CLIENT INSTANCE OF DATABASE
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_NAME,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT!),
  });

  // TRANSACTION "not necessary because this is development script"
  await client.connect();
  try {
    //
    await client.query("begin");

    // CREATE FAKE USERS
    for (let i = 0; i < numUsers; i++) {
      // generate random salt value for password hash
      const saltRounds = 10;
      const hash = await bcrypt.hash("password1234", saltRounds);
      // parameterized query
      await client.query(
        "insert into public.users (username, password, avatar) values ($1, $2, $3)",
        [faker.internet.userName(), hash, faker.image.avatar()]
      );
    }

    // CREATE FAKE POSTS
    const res = await client.query(
      "select id from public.users order by created_at desc limit $1",
      [numUsers]
    );
    // console.log(res.rows);

    for (const row of res.rows) {
      for (let i = 0; i < Math.ceil(Math.random() * 10); i++) {
        await client.query(
          "insert into public.posts (user_id, content) values ($1, $2)",
          [row.id, faker.lorem.sentence()]
        );
      }
    }

    // CREATE FAKE FOLLOWS
    for (const row1 of res.rows) {
      for (const row2 of res.rows) {
        if (row1.id != row2.id) {
          if (Math.random() > 0.5) {
            await client.query(
              "insert into follows (user_id, follower_id) values ($1, $2)",
              [row1.id, row2.id]
            );
          }
        }
      }
    }

    await client.query("commit");
  } catch (err) {
    await client.query("rollback");
    throw err;
  } finally {
    await client.end();
  }
}

// 
// console.log("===== 1 =====");
// console.log(process.argv);
// console.log(process.argv[0]);
// console.log(process.argv[1]);
// console.log(process.argv[2]);
// console.log("===== 2 =====");
const numUsers = parseInt(process.argv[2]) || 12;
// QUESTION: what is at process.argv[2] ?

console.log(`loading ${numUsers} fake users`);
loadFakeData(numUsers);
// NOTE: cannot load fake data if the tables do not exist already