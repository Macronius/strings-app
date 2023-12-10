import User from '@/app/components/User';
import useSWR from 'swr';

export default function FollowingList({index}: {index: number}) {
    // get user data first // NOTE: 
    const {data: userData} = useSWR("/api/users/profile");
    // this swr call depends on return data from first swr call, therefore this must be an anonymous arrow function
    const {data: followerData} = useSWR(() => "/api/users/" + userData.data.id + "/following?page=" + index);

    // NOTE: because this is constantly fetching, one could assume that if the data isn't there, then it is between fetches
    if (!followerData) return <div>Loading...</div>
    // console.log(followerData)

    //
    return (

        <div>
            <ul>
                {
                    followerData.data.map((followee: UserI) => (
                        <li key={followee.id} className="my-5">
                            <User user={followee} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

