"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

function Form() {
  // routing
  const router = useRouter();
  // states
  const [username, setUsername] = useState<undefined | string>("");
  const [password, setPassword] = useState<undefined | string>("");
  // handler functions
  async function handleSubmit(e: FormEvent) {
    // prevent default form behavior upon submission
    e.preventDefault();
    // use AJAX to handle the login
    const res = await fetch("/api/login", {
      method: "post",
      body: JSON.stringify({ username, password }),
    });
    //
    if (res.ok) {
      router.push("/feed");
    } else {
      alert("login failed");
    }
  }

  // return jsx
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-5 max-w-xs w-full bg-slate-800 rounded-lg"
    >
      <div className="text-center">
        <h3 className="font-semibold">Sign In</h3>
      </div>
      <div className="my-3">
        <hr />
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <label>Username</label>
          <input
            type="text"
            className="text-black p-3 border border-slate-700 rounded-lg"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            id="username"
            placeholder="Username"
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <label>Password</label>
          <input
            type="password"
            className="text-black p-3 border border-slate-700 rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            placeholder="Password"
            required
          />
        </div>
      </div>
      <button type="submit" className="mt-4 bg-slate-900  p-3 rounded-lg">
        Submit
      </button>
    </form>
  );
}

export default Form;
