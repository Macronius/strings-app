"use client"

import useSWR from 'swr';
import User from '../components/User'

export default function Header() {
    console.log("header loading")
    const {data, isLoading, error} = useSWR('/api/users/profile');
    console.log(error);
    // test all three input parameters
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    console.log(data.data)
    //
    return (
        <header className="flex w-full p-5 bg-slate-800 rounded-lg my-2 justify-between items-center">
            <div>
                <h1 className="font-mono text-lg">Sxrings</h1>
            </div>
            <div>
                <User user={data.data} />
            </div>
        </header>
    )
}