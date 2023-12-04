"use client";

import { useState, ChangeEvent } from "react";

export default function SearchBar() {
  // state
  const [searchResults, setSearchResults] = useState([]);

  //
  async function fetchSearchResults(searchText: string) {
    //
    const res = await fetch(`/api/search?q=${searchText}`);
    if (res.ok) {
        const json = await res.json();
        console.log(json);
        setSearchResults(json.data)
    }
  }

  // handler function
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    fetchSearchResults(e.target.value);
  }

  return (
    <div className="w-full text-white font-mono p-2">
      <input
        type="text"
        placeholder="search"
        className="p-2 rounded-lg bg-gray-700 my-2"
        onChange={handleChange}
      />
    </div>
  );
}
