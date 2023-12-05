"use client";

import React, { FormEvent, useState } from "react";

function Form() {
  // states
  const [username, setUsername] = useState<undefined | string>("");
  const [password, setPassword] = useState<undefined | string>("");
  const [avatar, setAvatar] = useState<undefined | string>("");
  const [confirmPassword, setConfirmPassword] = useState<undefined | string>("");
  // error handling (a different way than alerts)
  const [errors, setErrors] = useState<string[]>([]);

  // handler functions
  async function handleSubmit(e: FormEvent) {
    // prevent default form behavior upon submission
    e.preventDefault();
    // reset errors array
    setErrors([]);

    // validation that passwords match
    if (password !== confirmPassword) {
      // TODO: correct this is bad practice to directly change state without setFunction
      const newErrors = [];
      newErrors.push("Passwords must match");
      setErrors(newErrors);
      // setErrors(() => [...errors, "Passwords must match"]);
      return;
    }

    // use AJAX to handle the signup
    const res = await fetch("/api/signup", {
      method: "POST",
      // body: JSON.stringify({ username, password }),
      body: JSON.stringify({username, avatar, password}),
    });
    //
    if (res.ok) {
      window.location.href = "/signin";
    } else {
      alert("sign up failed");
    }
  }

  // return jsx
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-5 max-w-xs w-full bg-slate-800 rounded-lg"
    >
      <div className="text-center">
        <h3 className="font-semibold">Sign Up</h3>
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
          <label>Avatar</label>
          <input
            type="text"
            className="text-black p-3 border border-slate-700 rounded-lg"
            onChange={e => setAvatar(e.target.value)}
            value={avatar}
            id="avatar"
            placeholder="Avatar"
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
      <div className="flex flex-col gap-2">
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            className="text-black p-3 border border-slate-700 rounded-lg"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            id="confirm-password"
            placeholder="Confirm password"
            required
          />
        </div>
      </div>
      <button type="submit" className="mt-4 bg-slate-900  p-3 rounded-lg">
        Submit
      </button>
      {
        errors && errors.map(error => (
          <div key={error} className="text-red-600">
            {error}
          </div>
        ))
      }
    </form>
  );
}

export default Form;
