import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs'
import {NextResponse} from 'next/server'

export async function middleware(req){  
    const url = new URL(req.url);
const origin = url.origin;
const pathname = url.pathname;
const requestHeaders = new Headers(req.headers);
requestHeaders.set('x-url', req.url);
requestHeaders.set('x-origin', origin);
requestHeaders.set('x-pathname', pathname);
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req, res});
    await supabase.auth.getSession();
    return NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    });
}