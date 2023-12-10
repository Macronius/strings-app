"use client"

import useSWR from "swr";
import Form from './form'
import PostContainer from "@/app/components/Post-Container";

function Profile() {
  // fetch profile information
  const {data, isLoading, error} = useSWR("/api/users/profile");

  //
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  //
  // console.log(data);

  return (
    <div className="flex flex-col">
      <h2>Profile</h2>
      <Form />
      <hr className="m-3" />
      <PostContainer username={data.data.username} showEditBtn={true} />
    </div>
  )
}

export default Profile