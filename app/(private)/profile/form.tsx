"use client";

import { FormEvent, useState } from "react";
import { useSWRConfig } from "swr";

function Form() {
  //
  const { mutate } = useSWRConfig();
  // state
  const [post, setPost] = useState("");
  //
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    //
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ content: post }),
    });
    // if successful post, then clear the textarea
    if (res.ok) {
      setPost("");
      // use swr's mutate to auto-refetch all data
      mutate((key) => typeof key === "string" && key.startsWith("/api/posts"));
      // NOTE: for any the api calls made that are cached with SWR system, go make the calls again, update the data and update the components all automatically
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="dark:bg-slate-600 dark:placeholder-white dark:text-white bg-white placeholder-black text-black rounded-lg w-full my-2 p-2"
        placeholder="what is going on?"
        onChange={(e) => setPost(e.target.value)}
        value={post}
      />
      <button
        type="submit"
        className="dark:bg-slate-900 bg-slate-400 py-2 px-4 rounded-lg"
      >
        Post
      </button>
    </form>
  );
}

export default Form;
