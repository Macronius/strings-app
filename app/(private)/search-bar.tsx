"use client";

import { useState, ChangeEvent } from "react";
import * as _ from 'lodash';

export default function SearchBar() {
  // state
  const [searchResults, setSearchResults] = useState([]);

  // utility functions
  const debouncedFetchSearchResults = _.debounce(fetchSearchResults, 500);
  // NOTE: only when user stops typing for 0.5s does the fetch send the request

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
    if (e.target.value.length > 0) {
        debouncedFetchSearchResults(e.target.value);
    }
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
