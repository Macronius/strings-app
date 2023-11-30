import useSWR from "swr";
import FollowingContainer from './following-container'

export default async function Following() {
  //
  // const { data, isLoading, error } = useSWR("/api/users/:id/following");
  // //
  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>Loading...</div>;

  //
  return (
    <main>
      <h2>Following</h2>
      <FollowingContainer />
    </main>
  );
}
