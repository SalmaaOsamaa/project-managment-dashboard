import { useNavigate, Navigate } from "react-router-dom"
import Button from "../../components/ui/button"
import Input from "../../components/ui/input"
import ROUTES from "../../router/routes"
import { setAuthenticated, isAuthenticated as checkAuth } from "../../utils/auth"
import { Mail, Lock, LogIn, CheckCircle2 } from "lucide-react"

const AuthPage = () => {
    const navigate = useNavigate()

    if (checkAuth()) {
        return <Navigate to={ROUTES.DASHBOARD} replace />
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setAuthenticated(true)
        navigate(ROUTES.DASHBOARD)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
            <div className="w-full max-w-md">
                <div className="bg-card border border-border rounded-2xl shadow-lg p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <div className="flex justify-center">
                            <div className="p-3 rounded-full bg-primary/10">
                                <LogIn className="h-8 w-8 text-primary" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
                        <p className="text-muted-foreground">Sign in to access your dashboard</p>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            Login Information
                        </h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>You can enter <strong>any email address</strong> to login</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>You can enter <strong>any password</strong> to login</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>No account registration required</span>
                            </li>
                        </ul>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                Email
                            </label>
                            <Input 
                                id="email"
                                name="email" 
                                type="email" 
                                placeholder="Enter your email"
                                className="h-11"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                                <Lock className="h-4 w-4" />
                                Password
                            </label>
                            <Input 
                                id="password"
                                name="password" 
                                type="password"
                                placeholder="Enter your password"
                                className="h-11"
                                required
                            />
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full h-11 text-base font-semibold"
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AuthPage