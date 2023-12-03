import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/feed" className="text-blue-400">Return to Feed</Link>
    </div>
  )
}