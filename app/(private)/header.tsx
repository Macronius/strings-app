"use client"

import useSWR from 'swr';

// component fetcher call-back function
const fetcherCBFunction = async (url: RequestInfo | URL) => {
    const res = await fetch(url);
    //
    if (!res.ok) {
        const msg = "An error occurred while fetching user profile data.";
        const error = new Error(msg);
        //
        const info  = await res.json();
        const status = res.status;
        console.error(info, status);
        throw error;
    }
    //
    return res.json();
}

export default function Header() {
    
    const {data, isLoading, error} = useSWR('/api/users/profile', fetcherCBFunction);
    // test all three input parameters
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    console.log(data);
    
    //

    return (
        <header>{data.data.username}</header>
    )
}