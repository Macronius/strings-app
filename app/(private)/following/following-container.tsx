"use client";

import { useState } from "react";
import FollowingList from "./following-list";

function FollwingContainer() {
  // following the same SWR pagination strategy
  const [count, setCount] = useState(1);
  //
  const pages = [];
  //
  for (let i = 0; i < count; i++) {
    pages.push(<FollowingList index={i} />);
  }

  //
  return (
    <div>
      {pages}

      <div className="flex justify-center w-full">
        <button
          className="dark:bg-slate-900 bg-slate-400 py-2 px-4 rounded-lg"
          onClick={() => setCount(count + 1)}
        >
          Load More
        </button>
      </div>
    </div>
  );
}
export default FollwingContainer;
