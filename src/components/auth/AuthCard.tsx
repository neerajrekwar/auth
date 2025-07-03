"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Feather } from "lucide-react"
import { signIn } from "next-auth/react"
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"

interface AuthCardProps {
  userType: 'user' | 'admin'
  title: string
  description: string
  icon?: ReactNode
}

export function AuthCard({ userType, title, description, icon }: AuthCardProps) {
  const otherUserType = userType === 'user' ? 'admin' : 'user'
  const otherLoginPath = `/${otherUserType}/login`.replace('/user/login', '/login')
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get('error');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
       let description = 'An error occurred. Please try again.';
       if (error === 'CredentialsSignin') {
         description = "Invalid email or password.";
       } else if (error === 'AccessDenied') {
         description = 'You do not have permission to access this page.';
       } else if (error === 'AuthenticationRequired') {
          description = 'You must be logged in to view this page.';
       }
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description,
      });
    }
  }, [error, toast]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    const result = await signIn('credentials', {
      redirect: true,
      email,
      password,
      callbackUrl: searchParams.get('callbackUrl') ?? (userType === 'admin' ? '/admin/dashboard' : '/'),
    });

    if (result?.error) {
      // The useEffect will handle showing the toast based on the error in the URL
      const loginPath = userType === 'admin' ? '/admin/login' : '/login';
      router.push(`${loginPath}?error=${result.error}`);
      setLoading(false);
    } else if(result?.ok && result.url) {
      router.push(result.url);
      router.refresh();
    } else {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          {icon ?? <Feather className="w-12 h-12 text-primary" />}
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Login as an {otherUserType}?{" "}
          <Link href={otherLoginPath} className="underline text-primary hover:text-accent">
            Click here
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
