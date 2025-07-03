import { AuthCard } from '@/components/auth/AuthCard'

export default function UserLoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <AuthCard
        userType="user"
        title="User Login"
        description="Welcome back! Please log in to your account."
      />
    </div>
  )
}
