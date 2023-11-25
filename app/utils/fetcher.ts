const fetcherCBFunction = async (url: RequestInfo | URL) => {
    const res = await fetch(url);
    //
    if (!res.ok) {
        const msg = "An error occurred while fetching user profile data.";
        const error = new Error(msg);
        //
        const info  = await res.json();
        const status = res.status;
        //
        console.log("error from the fetcher")
        console.error(info, status);
        throw error;
    }
    //
    return res.json();
}

export default fetcherCBFunction;