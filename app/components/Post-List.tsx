import useSWR from 'swr'
import Post from './Post'

function PostList({ index, username }: { index: number; username: string }) {
    // fetch
    const {data, isLoading, error} = useSWR(() => "/api/posts?page=" + index + "&username=" + username);
    // NOTE: the unique string url is considered the key, which will be referenced in form.tsx as the 'key'

    //
    if (error) return <div>Failed to load</div>
    if (isLoading) return <div>Loading...</div>
    if (!data) return <div>No data</div>

    return (
        <ul>
            {
                data.data.map((post: PostI) => (
                    <li key={post.id} className="my-5">
                        <Post
                            post={post}
                        />
                    </li>
                ))
            }
        </ul>
    )
}

export default PostList;
