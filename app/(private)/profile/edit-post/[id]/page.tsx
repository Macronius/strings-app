"use client"

import useSWR from "swr"
import Form from './form'
import DeleteButton from "./delete-btn";

export default function EditPost({params}: {params: {id: number}}) {
    // QUESTION: not really sure why EditPost page is coming with props

    // use SWR to fetch data
    const {data, isLoading, error} = useSWR(`/api/posts/${params.id}`);
    //
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>Loading...</div>

    // console.log(data);

    //
    return (
        <main>
            <h2>Edit Post</h2>
            <div className="flex flex-col gap-10">
                <Form post={data.data} />
                <DeleteButton post={data.data} />
            </div>
        </main>
    )
}