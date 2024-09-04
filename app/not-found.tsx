import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col gap-6 items-center'>
      <h2 className='text-lg text-warning'>Page Not Found</h2>
      <Link href="/" className='link-info'>Return Home</Link>
    </div>
  )
}