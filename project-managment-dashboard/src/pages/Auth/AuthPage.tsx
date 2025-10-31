import { useNavigate, Navigate } from "react-router-dom"
import Button from "../../components/ui/button"
import Input from "../../components/ui/input"
import ROUTES from "../../router/routes"
import { setAuthenticated, isAuthenticated as checkAuth } from "../../utils/auth"

const AuthPage = () => {
    const navigate = useNavigate()

    // Redirect to dashboard if already authenticated
    if (checkAuth()) {
        return <Navigate to={ROUTES.DASHBOARD} replace />
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setAuthenticated(true)
        navigate(ROUTES.DASHBOARD)
    }

    return (
        <>
            <h1 className="text-3xl font-bold underline bg-red-500">Login</h1>
            <form 
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-center text-center mt-4"
            >
                <Input 
                    className="mb-4 w-1/2 rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                    name="email" 
                    type="email" 
                    placeholder="Email"
                    required
                />
                <Input 
                    className="mb-4 w-1/2 rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                    name="password" 
                    type="password"
                    placeholder="Password"
                    required
                />
                <Button className="w-1/2" name="submit" type="submit">Login</Button>
            </form>
        </>
    )
}

export default AuthPage