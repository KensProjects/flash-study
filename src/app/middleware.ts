import  { NextResponse, type NextRequest } from 'next/server'
import { getServerAuthSession } from '~/server/auth'

export async function middleware(req: NextRequest) {
    const session = await getServerAuthSession()

    function setPath(path: string) {
        return req.nextUrl.pathname.startsWith(path)
    }

    const welcomeRoute = setPath("/")

    if (session && welcomeRoute) {
        return NextResponse.redirect(`/user/${session.user.id}`)
    }
    
     if (!session) {
        return NextResponse.redirect("/api/auth/signin")
     }

    return NextResponse.next()
}