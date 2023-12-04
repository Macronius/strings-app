// not a server component, doesn't need "use client"

import { useState, ChangeEvent, useRef, useEffect,  } from "react";
import * as _ from "lodash";
import User from "../components/User";

export default function SearchBar() {
  // state
  const [searchResults, setSearchResults] = useState([]);
  const [visible, setVisible] = useState(true);
  // references
  const ref = useRef(null);

  // effect
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // if element clicked is not contained within the search bar, then user intends to close the search results
      // @ts-ignore
      if (ref.current && !ref.current.contains(e.target)) {
        setVisible(false);
      }
    };

    // event listeners
    document.addEventListener("click", handleClickOutside);

    // NOTE: in useEffect, the returned function is the "clean-up" function for when the component gets unmounted
    return () => {
      // remove the "run handleClickOutside on click" event listener
      document.removeEventListener("click", handleClickOutside);
    };
  });

  // utility functions
  const debouncedFetchSearchResults = _.debounce(fetchSearchResults, 500);
  // NOTE: only when user stops typing for 0.5s does the fetch send the request

  //
  async function fetchSearchResults(searchText: string) {
    const res = await fetch(`/api/search?q=${searchText}`);
    if (res.ok) {
      const json = await res.json();
      console.log(json);
      setVisible(true);
      setSearchResults(json.data);
    } else {
      setSearchResults([]);
      setVisible(false);
    }
  }

  // handler functions
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    // if (e.target.value.length > 0) {
    //   debouncedFetchSearchResults(e.target.value);
    // }
    debouncedFetchSearchResults(e.target.value);
  }

  function handleClick(e: React.MouseEvent<HTMLInputElement>) {
    setVisible(true);
  }

  return (
    //   <div className="w-full text-white font-mono p-2 flex flex-col max-w-md justify-end relative">
    <div
      className="flex flex-row max-w-md w-full justify-end relative"
      ref={ref}
    >
      <input
        type="text"
        placeholder="search"
        // className="p-2 rounded-lg bg-gray-700 my-0.5 max-w-sm"
        className="p-2 rounded-lg dark:bg-slate-700 dark:text-white bg-white text-black my-0.5 max-w-xs"
        onChange={handleChange}
        onClick={handleClick}
      />

      {visible && searchResults.length > 0 && (
        // <ul className="bg-gray-600 p-2 rounded-lg w-full max-w-sm absolute top-11 right-7">
        <ul className="flex flex-col bg-white text-black absolute p-2 rounded-lg top-14 w-full max-w-sm right-2">
          {searchResults.map((result: UserI) => (
            <li
              key={result.id}
              onClick={() => setVisible(false)}
              className="my-4"
            >
              <User user={result} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
