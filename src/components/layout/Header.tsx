"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Feather, User, LogOut } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  const { data: session, status } = useSession()
  const user = session?.user

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-card shadow-sm sticky top-0 z-50">
      <Link href="/" className="flex items-center justify-center gap-2">
        <Feather className="h-6 w-6 text-primary" />
        <span className="font-bold text-lg">ContentFlow</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/blog">
          Blogs
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/guides">
          Guides
        </Link>
        {status === 'loading' ? (
          <div className="h-8 w-20 animate-pulse bg-muted rounded-md" />
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Avatar>
                  <AvatarImage src={user.image ?? ''} alt={user.name ?? 'User'} />
                  <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.name ?? 'My Account'}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard">Admin Dashboard</Link>
                  </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-2">
            <Button asChild variant="ghost" size="sm">
                <Link href="/login">User Login</Link>
            </Button>
            <Button asChild size="sm">
                <Link href="/admin/login">Admin Login</Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  )
}
