"use client";

import { useState } from "react";
import FeedList from "./feed-list";

function FeedContainer() {
  // track how many times the 'load more' button has been pressed
  const [cnt, setCnt] = useState(1);

  // keep an array of pages, the page will be the feed list
  const pages = [];

  for (let i = 0; i < cnt; i++) {
    // any time 'load more' is pressed, this will re-run and re-generate the pages array
    pages.push(<FeedList index={i} key={i} />);
  }

  return (
    <div>
      {pages}

      <div className="flex justify-center">
        <button
          onClick={() => setCnt(cnt + 1)}
          className="dark:bg-slate-900 bg-slate-400 p-2 rounded-lg"
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default FeedContainer;
