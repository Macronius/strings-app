import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { getClient } from "@/db";


async function loadFakeData(numUsers: number = 10) {
  console.log(`executing load-fake-data.ts - generating ${numUsers} users.`);

  // INSTANTIATE CLIENT INSTANCE OF DATABASE
  const client = await getClient();

  // TRANSACTION STYLE SYNTAX "not necessary because this is development script"
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
    console.log("res.rows")
    console.log(res.rows);

    for (const row of res.rows) {
      for (let i = 0; i < Math.ceil(Math.random() * 50); i++) {
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
const numUsers = parseInt(process.argv[2]) || 10;
//
console.log(`loading ${numUsers} fake users`);
loadFakeData(numUsers);