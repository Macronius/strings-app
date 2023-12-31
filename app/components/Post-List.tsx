import useSWR from "swr";
import Post from "./Post";

function PostList({
  index,
  username,
  showEditBtn,
}: {
  index: number;
  username: string;
  showEditBtn?: boolean;
}) {
  // fetch
  const { data, isLoading, error } = useSWR(
    () => "/api/posts?page=" + index + "&username=" + username
  );
  // NOTE: the unique string url is considered the key, which will be referenced in form.tsx as the 'key'

  //
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  return (
    <ul>
      {data.data.map((post: PostI) => (
        <li key={post.id} className="">
          <Post post={post} showEditBtn={showEditBtn} />
          <hr className="m-5"/>
        </li>
      ))}
    </ul>
  );
}

export default PostList;
