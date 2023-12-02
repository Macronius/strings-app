import Image from 'next/image';
import useSWR from 'swr';

export default function AvatarForm(){
    const {data, isLoading, error} = useSWR("/api/users/profile");
    //
    if (error) return <div>Error loading</div>
    if (isLoading) return <div>Loading...</div>
    //
    const user = data.data;
    
    return (
        <form>
            {
                user.avatar && (
                    <div>
                        <Image
                            src={user.avatar}
                            alt={user.avatar}
                            width={200}
                            height={200}
                            className="rounded-full mx-auto my-5"
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
            <input type="file" />
        </form>
    )
}