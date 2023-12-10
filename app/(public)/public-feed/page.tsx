// NOTE: this is a server component

import Post from "@/app/components/Post";
import { sql } from "@/db";

async function getData() {
  const res = await sql(`
    select p.*, u.username, u.avatar 
    from posts p inner join users u 
    on p.user_id = u.id 
    order by created_at desc 
    limit 10
  `);
  //
  return res.rows;
}

export default async function PublicFeed() {
  const postsData = await getData();
  //
  return (
    <main>
      <h1 className="font-semibold text-3xl text-yellow-50">Sxrings</h1>
      <div className="">
        <h2 className="font-extralight text-xl mb-4 text-yellow-50">
          Recent Posts from the community
        </h2>
        <div className="flex flex-col gap-4">
          {postsData.map((postdata, index) => (
            <div className=" bg-slate-500 rounded-md p-4" key={index}>
              <Post post={postdata} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
