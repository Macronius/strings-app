import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';

export default function AvatarForm(){
    const {data, isLoading, error} = useSWR("/api/users/profile");
    //
    if (error) return <div>Error loading</div>
    if (isLoading) return <div>Loading...</div>
    //
    const user = data.data;
    
    return (
        <div>
            {
                user.avatar && (
                    <div>
                        <Image
                            src={user.avatar}
                            alt={user.avatar}
                            width={200}
                            height={200}
                            className="rounded-full mx-auto my-5 dark:bg-gray-400 bg-yellow-50"
                        />
                    </div>
                )
            }
            {
                !user.avatar && (
                    <div 
                        className="bg-slate-600 rounded-full mx-auto my-5"
                        style={{width: 200, height: 200}}
                    />
                )
            }
            
            <Link 
                href="/avatar/upload"
                className="dark:text-green-400 text-green-800 underline"
            >
                Edit avatar
            </Link>
        </div>
    )
}