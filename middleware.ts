import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if the pathname already has a language prefix
  const hasLanguagePrefix = pathname.startsWith('/en') || pathname.startsWith('/tr')
  
  if (!hasLanguagePrefix) {
    // If no language prefix, redirect to default language (English)
    const url = request.nextUrl.clone()
    url.pathname = `/en${pathname}`
    return NextResponse.redirect(url)
  }
  
  // Extract language from pathname
  const language = pathname.startsWith('/tr') ? 'tr' : 'en'
  
  // Store language in headers for the app to use
  const response = NextResponse.next()
  response.headers.set('x-language', language)
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

