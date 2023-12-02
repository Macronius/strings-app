import { useRouter } from "next/navigation";


export default function SignOutButton () {
    const router = useRouter();
    //
    async function handleSignout() {
        const res = await fetch("/api/logout");
        //
        if (res.ok) {
            router.push("signin");
        }
    }

    //
    return (
        <button 
            onClick={handleSignout}
            className="text-green-400 underline p-1 rounded-lg my-5"
        >
            Sign Out
        </button>
    )
}