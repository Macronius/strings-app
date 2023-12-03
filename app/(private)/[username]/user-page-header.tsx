import useSWR, {mutate} from "swr";

// QUESTION: why does this need a separate component?

const UserPageHeader = ({ username }: { username: string }) => {
  // use swr to fetch data
  const {
    data: dataUser,
    isLoading: isLoadingUser,
    error: errorUser,
  } = useSWR(`api/users?username=${username}`);
  // fetch whether following or not following user (note: must be a callback function because it depends on the previous swr call)
  const {
    data: dataFollow,
    isLoading: isLoadingFollow,
    error: errorFollow,
  } = useSWR(() => `/api/follows?user_id=${dataUser.data[0].id}`);
  //   Q-09 ^

  //
  if (errorUser || errorFollow) return <div>Failed to load</div>;
  if (isLoadingUser || isLoadingFollow) return <div>Loading...</div>;

  console.log(dataUser, dataFollow);

  //
  const user = dataUser.data[0];

  // onClick handler functions:
  async function handleUnfollow() {
    const res = await fetch(`/api/follows/${user.id}`, {method: "delete"});
    if (res.ok) {
        // force revalidation of useSWR(() => `/api/follows?user_id=${dataUser.data[0].id}`), refetch, then the data will repropogate to the UI
        mutate(`/api/follows?user_id=${user.id}`);
        // NOTE: this enables UI to automatically display the correct button after follow/or/unfollow selected
    }
  }

  async function handleFollow() {
    const res = await fetch("/api/follows", {method: "post", body: JSON.stringify({user_id: user.id})});
    if (res.ok) {
        // force revalidation of useSWR(() => `/api/follows?user_id=${dataUser.data[0].id}`), refetch, then the data will repropogate to the UI
        mutate(`/api/follows?user_id=${user.id}`);
        // NOTE: this enables UI to automatically display the correct button after follow/or/unfollow selected
    }
  }



  return (
    <header className="w-full bg-slate-700 p-4 rounded-lg flex mb-4 justify-between items-center">
        <h1 className="text-lg font-bold">{username}</h1>
        {dataFollow.data.length > 0 && <button onClick={handleUnfollow} className="bg-slate-900 p-2 rounded-lg">Unfollow</button>}
        {dataFollow.data.length === 0 && <button onClick={handleFollow} className="bg-slate-900 p-2 rounded-lg">Follow</button>}
    </header>
  );
};

export default UserPageHeader;
