"use clieint";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

function Form({ post }: { post: PostI }) {
  const router = useRouter();
  const [content, setContent] = useState(post.content);
  // console.log(router);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    //
    const res = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      body: JSON.stringify({ content: content }),
    });
    //
    if (res.ok) {
      setContent("");
      router.push("/profile");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="dark:bg-slate-600 dark:text-white bg-white text-black p-2 rounded-lg w-full my-2"
        placeholder="what's happening"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="bg-slate-900 py-2 px-4 rounded-lg">
        Update Post
      </button>
    </form>
  );
}

export default Form;
