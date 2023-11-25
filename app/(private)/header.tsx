"use client"

import useSWR from 'swr';

export default function Header() {
    
    const {data, isLoading, error} = useSWR('/api/users/profile');
    // test all three input parameters
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    console.log(data);
    //
    return (
        <header>{data.data.username}</header>
    )
}