import Link from "next/link";

export default function NotFoundPage({ resource }: { resource: string }) {


     return (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
            <h2>{resource} not round!</h2>
            <p>Could not find requested resource</p>
            <Link href="/">Return Home</Link>
        </div>
    )
}
