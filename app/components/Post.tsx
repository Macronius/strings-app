import Image from "next/image";
import Link from "next/link";

function Post({ post, showEditBtn }: { post: PostI; showEditBtn?: boolean }) {
  //
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  //
  const createdAt = new Date(post.created_at);

  return (
    <div className="flex">
      <div className="flex items-start">
        {post.avatar && (
          <Link href={`/${post.username}`}>
            <Image
              src={post.avatar}
              alt={post.username}
              width={50}
              height={50}
              className="rounded-full mt-3 mr-3"
            />
          </Link>
        )}
        {!post.avatar && (
          <div
            style={{ width: 50, height: 50 }}
            className="bg-slate-600 rounded-full mr-3"
          />
        )}
      </div>

      <div className="flex flex-col max-w-xs">
        <div className="font-bold">
          <Link href={`/${post.username}`}>{post.username}</Link>
        </div>
        <div className="text-xs dark:text-slate-400 text-slate-800">
          {createdAt.toLocaleDateString("en-us", options)}
        </div>
        <div className="text-sm">{post.content}</div>
      </div>

      {showEditBtn && (
        <div className="text-right flex-grow">
          <Link
            href={`/profile/edit-post/${post.id}`}
            className="text-green-400"
          >
            Edit
          </Link>
        </div>
      )}
    </div>
  );
}

export default Post;
