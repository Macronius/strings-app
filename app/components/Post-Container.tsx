import {useState} from 'react';
import PostList from './Post-List'

function PostContainer ({username}: {username: string}) {
    // state
    const [count, setCount] = useState(1);
    //
    const pages = [];
    //
    for (let i = 0; i < count; i++) {
        pages.push(
            <PostList
                key={i}
                index={i}
                username={username}
            />
        )
    }

    //
    return (
        <div className="my-5">
            {pages}
            <div className="flex justify-center">
                <button 
                    onClick={() => setCount(count+1)}
                    className="bg-slate-900 rounded-lg py-2 px-4 my-5"
                >
                    Load More
                </button>
            </div>
        </div>
    )

}

export default PostContainer;