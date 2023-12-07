"use client"

import { useRouter } from "next/navigation"; // NOTE: because using App Router
import { useState } from "react";

export default function DeleteButton({post}: {post: PostI}) {
    // NOTE: after post deletion, user should be rerouted
    const router = useRouter();
    // state - show confirmation before user deletes the post
    const [state, setState] = useState({showConfirm: false}); // slightly different pattern to track state

    // delete post handler function
    async function handleDeletePost() {
        const res = await fetch(`/api/posts/${post.id}`, {method: "DELETE"});
        //
        if (res.ok) {
            router.push("/profile")
        }
    }

    // click handler
    function handleClick() {
        // const newState = Object.assign({}, state, {showConfirm: !state.showConfirm,});
        // setState(newState);
        setState({...state, showConfirm: !state.showConfirm})
    }

    return (
        <div>
            {!state.showConfirm && <button className="text-red-400" onClick={handleClick}>Delete Post</button>}

            {state.showConfirm && (
                <div>
                    <p>Are you sure you want to delete this post?</p>
                    <div className="flex gap-10">
                        <button className="text-red-400" onClick={handleDeletePost}>Yes</button>
                        <button className="text-blue-400" onClick={handleClick}>No</button>
                    </div>
                </div>
                )
            }
        </div>
    )
}