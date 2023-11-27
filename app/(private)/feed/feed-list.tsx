import useSWR from 'swr';
import Post from '../../components/Post'

function FeedList ({index}: {index: number}) {
    //
    const {data, isLoading, error} = useSWR("/api/posts/feed?pages="+index);
    console.log(data)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>Loading...</div>

    //
    return (
        <ul>
            {data.data.map((post: PostI, index: number) => (
                <li 
                    // key={index}
                    key={post.id}
                    className="my-5"
                >
                    <Post post={post} />
                </li>
            ))}
        </ul>
    )
}

export default FeedList;